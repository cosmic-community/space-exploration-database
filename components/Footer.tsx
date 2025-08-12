export default function Footer() {
  return (
    <footer className="bg-cosmic-blue/90 backdrop-blur-sm border-t border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🚀</div>
              <span className="text-xl font-bold text-star-yellow">Space Database</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Exploring the cosmos through comprehensive data on space missions, astronauts, and celestial bodies. 
              Discover humanity's greatest adventures beyond Earth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/missions" className="text-slate-300 hover:text-star-yellow transition-colors duration-200 text-sm">
                  🚀 Space Missions
                </a>
              </li>
              <li>
                <a href="/astronauts" className="text-slate-300 hover:text-star-yellow transition-colors duration-200 text-sm">
                  👨‍🚀 Astronauts
                </a>
              </li>
              <li>
                <a href="/celestial-bodies" className="text-slate-300 hover:text-star-yellow transition-colors duration-200 text-sm">
                  🪐 Celestial Bodies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Connect</h3>
            <p className="text-slate-300 text-sm mb-2">
              Built with <span className="text-nebula-pink">♥</span> for space enthusiasts
            </p>
            <p className="text-slate-400 text-xs">
              Powered by Cosmic CMS
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Space Exploration Database. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-slate-400 text-xs">
                Reach for the stars ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}