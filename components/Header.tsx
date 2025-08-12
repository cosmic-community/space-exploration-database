import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-cosmic-blue/90 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="text-2xl">🚀</div>
            <span className="text-xl font-bold text-star-yellow">Space Database</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/missions" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              Missions
            </Link>
            <Link 
              href="/astronauts" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              Astronauts
            </Link>
            <Link 
              href="/celestial-bodies" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              Celestial Bodies
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200"
              aria-label="Mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t border-slate-700/50">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/missions" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              🚀 Missions
            </Link>
            <Link 
              href="/astronauts" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              👨‍🚀 Astronauts
            </Link>
            <Link 
              href="/celestial-bodies" 
              className="text-slate-200 hover:text-star-yellow transition-colors duration-200 font-medium"
            >
              🪐 Celestial Bodies
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}