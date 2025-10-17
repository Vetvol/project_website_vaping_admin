'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, Trash2, Eye, Download } from 'lucide-react'

interface ImageFile {
  id: string
  name: string
  url: string
  size: number
  uploadedAt: Date
  category: string
}

export default function ImageManagement() {
  const [images, setImages] = useState<ImageFile[]>([
    {
      id: '1',
      name: 'hero-bg.jpg',
      url: '/api/placeholder/800/600',
      size: 245760,
      uploadedAt: new Date('2024-01-15'),
      category: 'hero'
    },
    {
      id: '2',
      name: 'product-strawberry.jpg',
      url: '/api/placeholder/400/400',
      size: 189440,
      uploadedAt: new Date('2024-01-14'),
      category: 'products'
    },
    {
      id: '3',
      name: 'e-cigarette-animation.png',
      url: '/api/placeholder/300/500',
      size: 156789,
      uploadedAt: new Date('2024-01-13'),
      category: 'animations'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isUploading, setIsUploading] = useState(false)

  const categories = [
    { id: 'all', name: 'All Images' },
    { id: 'hero', name: 'Hero Section' },
    { id: 'products', name: 'Products' },
    { id: 'animations', name: 'Animations' },
    { id: 'backgrounds', name: 'Backgrounds' },
    { id: 'icons', name: 'Icons' }
  ]

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    
    // Simulate upload process
    for (const file of acceptedFiles) {
      const newImage: ImageFile = {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date(),
        category: selectedCategory === 'all' ? 'general' : selectedCategory
      }
      
      setImages(prev => [newImage, ...prev])
    }
    
    setIsUploading(false)
  }, [selectedCategory])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  })

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Image Management</h2>
          <p className="text-gray-600">Upload and manage images for your website</p>
        </div>
        <div className="text-sm text-gray-500">
          {images.length} images • {formatFileSize(images.reduce((acc, img) => acc + img.size, 0))} total
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Upload Area */}
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        {isDragActive ? (
          <p className="text-primary-600 font-medium">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-2">
              Drag & drop images here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP (max 10MB each)
            </p>
          </div>
        )}
        {isUploading && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Uploading...</p>
          </div>
        )}
      </motion.div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-4 group"
          >
            <div className="relative mb-3">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity duration-200">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-primary-600"
                  >
                    <Eye size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-green-600"
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
              <p className="text-sm text-gray-500">{formatFileSize(image.size)}</p>
              <p className="text-xs text-gray-400">
                {image.uploadedAt.toLocaleDateString()}
              </p>
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {image.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500">No images found in this category</p>
        </div>
      )}
    </div>
  )
}
