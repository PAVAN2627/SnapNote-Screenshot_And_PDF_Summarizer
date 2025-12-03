import { useCallback, useState } from 'react'

export default function FileUpload({ onFileUpload, loading }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndUpload(file)
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) validateAndUpload(file)
  }

  const validateAndUpload = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG, JPG, or PDF file')
      return
    }
    onFileUpload(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-12 border-2 border-dashed transition-all duration-300 ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 scale-105' 
          : 'border-blue-300 hover:border-blue-400'
      } ${loading ? 'opacity-75' : ''}`}
    >
      <div className="text-center">
        <div className={`mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
          {loading ? (
            <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg
              className="h-10 w-10 text-blue-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p className="text-xl font-semibold text-gray-700 mb-2">
          {loading ? 'Processing your file...' : isDragging ? 'Drop it here!' : 'Drag and drop your file here'}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Supports PNG, JPG, JPEG, and PDF files
        </p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        <label className="inline-block">
          <input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileInput}
            disabled={loading}
          />
          <span className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2 transform hover:-translate-y-0.5">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Browse Files
          </span>
        </label>
      </div>
    </div>
  )
}
