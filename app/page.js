import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">HubIt</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/courses">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Master Operating Systems
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Learn comprehensive Operating System concepts from fundamentals to advanced topics. Start your journey
              with HubIt today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/courses">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition w-full sm:w-auto">
                  Start Course
                </button>
              </Link>
              <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-lg transition w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative h-96 rounded-xl bg-red-50 border-2 border-red-600 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💻</div>
              <p className="text-red-600 font-semibold text-lg">Operating Systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-red-50 py-16 border-t-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose HubIt?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-red-600">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive Content</h3>
              <p className="text-gray-700">Learn everything from basics to advanced operating system concepts</p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-red-600">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Practice with Quizzes</h3>
              <p className="text-gray-700">Test your knowledge with interactive quizzes after each lesson</p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-red-600">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get Certified</h3>
              <p className="text-gray-700">Earn a certificate upon course completion</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

