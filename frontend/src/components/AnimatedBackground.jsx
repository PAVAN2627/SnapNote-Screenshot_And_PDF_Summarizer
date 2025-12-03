export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 animate-gradient"></div>
      
      {/* Large animated blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-300/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-300/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-400/40 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-float-reverse"></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-pink-400/40 rounded-full animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-float-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400/40 rounded-full animate-float-reverse" style={{ animationDelay: '2s' }}></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-300/20 rounded-lg animate-float-slow"></div>
      <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-purple-300/20 rounded-full animate-float-reverse"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-indigo-300/20 rotate-45 animate-float"></div>
      
      {/* Sparkles */}
      <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-white rounded-full animate-sparkle"></div>
      <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-white rounded-full animate-sparkle" style={{ animationDelay: '3s' }}></div>
      
      {/* Grid overlay for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
    </div>
  )
}
