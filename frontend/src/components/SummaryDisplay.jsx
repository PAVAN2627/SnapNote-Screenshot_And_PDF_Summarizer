export default function SummaryDisplay({ summary }) {
  const formatSummary = (text) => {
    const sections = text.split(/\*\*\d+\.\s+/).filter(Boolean)
    return sections.map((section, index) => {
      const [title, ...content] = section.split('**')
      const cleanContent = content.join('').trim()
      
      return (
        <div key={index} className="mb-6 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
          <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm">
              {index + 1}
            </span>
            {title.trim()}
          </h3>
          <div className="pl-10 text-gray-700 leading-relaxed">
            {cleanContent.split('\n').map((line, i) => {
              const trimmed = line.trim()
              if (!trimmed || trimmed === '---') return null
              
              if (trimmed.startsWith('-')) {
                return (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{trimmed.substring(1).trim()}</span>
                  </div>
                )
              }
              
              return <p key={i} className="mb-2">{trimmed}</p>
            })}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">AI-Generated Summary</h2>
      </div>
      
      <div className="space-y-4">
        {formatSummary(summary)}
      </div>
    </div>
  )
}
