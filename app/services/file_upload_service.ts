import { MultipartFile } from '@adonisjs/core/bodyparser'
import drive from '@adonisjs/drive/services/main'
import { randomUUID } from 'node:crypto'
import { extname, basename } from 'node:path'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import redis from '@adonisjs/redis/services/main'

export interface UploadResult {
  success: boolean
  url?: string
  filename?: string
  fileHash?: string
  fileSize?: number
  mimeType?: string
  error?: string
}

export interface FileValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
  checkVirus?: boolean // Future: integrate with virus scanning service
  generateHash?: boolean // Generate file hash for integrity verification
}

export interface UploadMetrics {
  totalUploads: number
  successfulUploads: number
  failedUploads: number
  totalBytesUploaded: number
  averageFileSize: number
  lastUploadTime: number
}

export class FileUploadService {
  private static readonly DEFAULT_MAX_SIZE = 5 * 1024 * 1024 // 5MB
  private static readonly DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  private static readonly DEFAULT_ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

  // Upload metrics
  private static metrics: UploadMetrics = {
    totalUploads: 0,
    successfulUploads: 0,
    failedUploads: 0,
    totalBytesUploaded: 0,
    averageFileSize: 0,
    lastUploadTime: 0
  }

  /**
   * Upload a single file to the configured storage
   */
  static async uploadFile(
    file: string | MultipartFile,
    options: FileValidationOptions = {},
    folder: string = 'uploads/events'
  ): Promise<UploadResult> {
    const startTime = Date.now()

    try {

      // Ensure file is a MultipartFile instance
      if (typeof file === 'string') {
        return {
          success: false,
          error: 'Invalid file: expected MultipartFile but received string'
        }
      }

      // Validate file
      const validation = await this.validateFile(file, options)
      if (!validation.valid) {
        this.metrics.totalUploads++
        this.metrics.failedUploads++
        return {
          success: false,
          error: validation.error
        }
      }

      // Generate file hash if requested
      let fileHash: string | undefined
      if (options.generateHash) {
        fileHash = await this.generateFileHash(file)
      }

      // Generate unique filename
      const filename = this.generateUniqueFilename(file.clientName)
      const filePath = `${folder}/${filename}`

      // Read file content from tmpPath to upload
      if (!file.tmpPath) {
        throw new Error('File tmpPath is missing')
      }
      const fileContent = readFileSync(file.tmpPath)

      // Upload file content to storage
      await drive.use().put(filePath, fileContent)

      // Generate public URL
      const url = await drive.use().getUrl(filePath)

      // Track metrics
      this.metrics.totalUploads++
      this.metrics.successfulUploads++
      this.metrics.totalBytesUploaded += file.size
      this.metrics.averageFileSize = this.metrics.totalBytesUploaded / this.metrics.successfulUploads
      this.metrics.lastUploadTime = Date.now() - startTime

      return {
        success: true,
        url,
        filename: filePath,
        fileHash,
        fileSize: file.size,
        mimeType: file.type
      }
    } catch (error: any) {
      this.metrics.totalUploads++
      this.metrics.failedUploads++
      return {
        success: false,
        error: `Upload failed: ${error.message}`
      }
    }
  }

  /**
   * Delete a file from storage
   */
  static async deleteFile(filename: string): Promise<boolean> {
    try {
      await drive.use().delete(filename)
      return true
    } catch (error) {
      console.error(`Failed to delete file ${filename}:`, error)
      return false
    }
  }

  /**
   * Get file URL
   */
  static async getFileUrl(filename: string): Promise<string | null> {
    try {
      return await drive.use().getUrl(filename)
    } catch (error) {
      console.error(`Failed to get URL for ${filename}:`, error)
      return null
    }
  }

  /**
   * Check if file exists
   */
  static async fileExists(filename: string): Promise<boolean> {
    try {
      return await drive.use().exists(filename)
    } catch (error) {
      return false
    }
  }

  /**
   * Validate file before upload
   */
  private static async validateFile(
    file: MultipartFile,
    options: FileValidationOptions
  ): Promise<{ valid: boolean; error?: string }> {
    const {
      maxSize = this.DEFAULT_MAX_SIZE,
      allowedTypes = this.DEFAULT_ALLOWED_TYPES,
      allowedExtensions = this.DEFAULT_ALLOWED_EXTENSIONS
    } = options

    // Check if file is valid
    if (!file.isValid) {
      return { valid: false, error: 'Invalid file' }
    }

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`
      }
    }

    // Check file type
    if (!allowedTypes.includes(file.type || '')) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      }
    }

    // Check file extension
    const extension = extname(file.clientName).toLowerCase()
    if (!allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`
      }
    }

    return { valid: true }
  }

  /**
   * Generate a unique filename
   */
  private static generateUniqueFilename(originalName: string): string {
    const extension = extname(originalName)
    const baseName = basename(originalName, extension)
    const timestamp = Date.now()
    const uuid = randomUUID().split('-')[0]

    return `${baseName}-${timestamp}-${uuid}${extension}`
  }

  /**
   * Clean up old files (for maintenance)
   */
    static async cleanupOldFiles(folder: string): Promise<number> {
        try {
            // Drive does not support 'keys' or TTL like Redis.
            // This is a placeholder for disk-based cleanup logic.
            // Saat menyimpan, set TTL langsung (misal 30 hari)
            await redis.set(`folder:${folder}`, 'value', 'EX', 30 * 24 * 60 * 60)
            return 0
        } catch (error) {
            throw new Error(`Failed to cleanup old files: ${error}`)
        }
    }

  /**
   * Generate SHA-256 hash of file content
   */
  private static async generateFileHash(file: MultipartFile): Promise<string> {
    try {
      const hash = createHash('sha256')
      
      // Use the underlying stream or tmpPath to generate hash
      const fs = await import('node:fs')
      const fileBuffer = fs.readFileSync(file.tmpPath!)
      hash.update(fileBuffer)
      
      return hash.digest('hex')
    } catch (error) {
      console.error('Error generating file hash:', error)
      return ''
    }
  }

  /**
   * Get upload metrics
   */
  static getMetrics(): UploadMetrics {
    return { ...this.metrics }
  }

  /**
   * Reset metrics
   */
  static resetMetrics(): void {
    this.metrics = {
      totalUploads: 0,
      successfulUploads: 0,
      failedUploads: 0,
      totalBytesUploaded: 0,
      averageFileSize: 0,
      lastUploadTime: 0
    }
  }

  /**
   * Get upload success rate
   */
  static getSuccessRate(): number {
    if (this.metrics.totalUploads === 0) return 0
    return (this.metrics.successfulUploads / this.metrics.totalUploads) * 100
  }

  /**
   * Validate file integrity with hash
   */
  static async verifyFileHash(filename: string, expectedHash: string): Promise<boolean> {
    try {
      const buffer = await drive.use().get(filename)
      const hash = createHash('sha256')
      hash.update(buffer)
      const calculatedHash = hash.digest('hex')
      
      return calculatedHash === expectedHash
    } catch (error) {
      console.error('Error verifying file hash:', error)
      return false
    }
  }
}