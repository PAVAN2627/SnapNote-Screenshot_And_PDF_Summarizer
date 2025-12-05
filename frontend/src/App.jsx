import { useState } from 'react'
import FileUpload from './components/FileUpload'
import TextEditor from './components/TextEditor'
import SummaryDisplay from './components/SummaryDisplay'
import FeatureCard from './components/FeatureCard'
import AnimatedBackground from './components/AnimatedBackground'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

function App() {
  const [filename, setFilename] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [inputMode, setInputMode] = useState('upload') // 'upload' or 'paste'

  const handleFileUpload = async (file) => {
    setLoading(true)
    setError('')
    setSuccess('')
    setSummary('')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setFilename(response.data.filename)
      setExtractedText(response.data.text)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!extractedText) return
    
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await axios.post(`${API_URL}/summarize`, {
        text: extractedText
      })
      
      setSummary(response.data.summary)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to summarize text')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!extractedText || !summary) return
    
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await axios.post(`${API_URL}/generate-pdf`, {
        filename,
        text: extractedText,
        summary
      }, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'SnapNote_Summary.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      
      setSuccess('PDF downloaded successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to generate PDF')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg animate-float-slow">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
              SnapNote
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </h1>
          </div>
          <p className="text-gray-700 text-lg font-medium">Convert screenshots & PDFs into AI-powered summarized notes</p>
        </header>

        {error && (
          <div className="mb-4 p-4 bg-red-50/90 backdrop-blur-md border-l-4 border-red-500 text-red-700 rounded-lg shadow-xl animate-slideIn flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50/90 backdrop-blur-md border-l-4 border-green-500 text-green-700 rounded-lg shadow-xl animate-slideIn flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <FeatureCard />

        {/* Input Mode Toggle */}
        <div className="flex justify-center gap-4 mb-6 animate-fadeIn">
          <button
            onClick={() => { setInputMode('upload'); setExtractedText(''); setSummary(''); setError(''); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              inputMode === 'upload'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white/70 backdrop-blur-md text-gray-700 hover:bg-white/90'
            }`}
          >
            📤 Upload File
          </button>
          <button
            onClick={() => { setInputMode('paste'); setExtractedText(''); setSummary(''); setError(''); setFilename(''); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              inputMode === 'paste'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white/70 backdrop-blur-md text-gray-700 hover:bg-white/90'
            }`}
          >
            📝 Paste Text
          </button>
        </div>

        <div className="space-y-6">
          {inputMode === 'upload' ? (
            <FileUpload onFileUpload={handleFileUpload} loading={loading} />
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Paste Your Text</h2>
              </div>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Paste your text here to summarize... (articles, notes, documents, etc.)"
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
              />
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    {extractedText.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {extractedText.length} characters
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {extractedText && inputMode === 'upload' && (
            <TextEditor 
              text={extractedText} 
              onChange={setExtractedText}
              filename={filename}
            />
          )}
          
          {extractedText && (
            <>
              <div className="flex gap-4 justify-center animate-fadeIn">
                <button
                  onClick={handleSummarize}
                  disabled={loading || !extractedText}
                  className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Summarize with AI
                    </>
                  )}
                </button>
                
                {summary && inputMode === 'upload' && (
                  <button
                    onClick={handleDownloadPDF}
                    disabled={loading}
                    className="group px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 animate-slideIn"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                )}
              </div>
            </>
          )}

          {summary && <SummaryDisplay summary={summary} />}
        </div>

        <footer className="mt-12 text-center animate-fadeIn">
          <div className="inline-block bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30">
            <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Powered by Azure OpenAI • Built with React & FastAPI
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
