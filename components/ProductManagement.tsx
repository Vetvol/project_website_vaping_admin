'use client'

import { motion } from 'framer-motion'
import { Package, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  series: string
  status: 'active' | 'inactive'
  stock: number
  price: number
  imageUrl: string
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wild Strawberry Ice',
      description: 'Bursting with the sweet flavor of wild strawberries, this refreshing vape is perfectly balanced by a cool exhale.',
      series: 'SIC! SALTS',
      status: 'active',
      stock: 150,
      price: 12.99,
      imageUrl: '/api/placeholder/200/200'
    },
    {
      id: '2',
      name: 'Raspberry Ice',
      description: 'Indulge in the irresistible flavor of juicy raspberries, perfectly complemented by a touch of cooler.',
      series: 'SIC! SALTS',
      status: 'active',
      stock: 200,
      price: 12.99,
      imageUrl: '/api/placeholder/200/200'
    },
    {
      id: '3',
      name: 'Strawberry Mojito',
      description: 'A perfect blend of sweet strawberries and refreshing mojito, offering a vibrant, fruity flavor with a minty kick.',
      series: 'MOJITO',
      status: 'active',
      stock: 120,
      price: 13.99,
      imageUrl: '/api/placeholder/200/200'
    }
  ])

  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  const handleToggleStatus = (id: string) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
        : product
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your vaping products and inventory</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingProduct(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Series
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.series}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleStatus(product.id)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </motion.button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingProduct(product)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsAddingProduct(false)
            setEditingProduct(null)
          }}
          onSave={(productData) => {
            if (editingProduct) {
              setProducts(prev => prev.map(p => 
                p.id === editingProduct.id ? { ...p, ...productData } : p
              ))
            } else {
              const newProduct: Product = {
                id: Date.now().toString(),
                ...productData,
                imageUrl: '/api/placeholder/200/200'
              }
              setProducts(prev => [newProduct, ...prev])
            }
            setIsAddingProduct(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

function ProductModal({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: Product | null
  onClose: () => void
  onSave: (data: Partial<Product>) => void
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    series: product?.series || 'SIC! SALTS',
    status: product?.status || 'active',
    stock: product?.stock || 0,
    price: product?.price || 0
  })

  const seriesOptions = ['SIC! SALTS', 'DUPLEX', 'THEA', 'MOJITO']

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input-field h-20 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Series
            </label>
            <select
              className="input-field"
              value={formData.series}
              onChange={(e) => setFormData({ ...formData, series: e.target.value })}
            >
              {seriesOptions.map(series => (
                <option key={series} value={series}>{series}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="input-field"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="btn-primary"
          >
            {product ? 'Update' : 'Create'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
