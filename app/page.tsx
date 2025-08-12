import Link from 'next/link'
import { getMissions, getAstronauts } from '@/lib/cosmic'
import type { Mission, Astronaut } from '@/types'

export default async function HomePage() {
  // Fetch recent missions and astronauts for the homepage
  const [missions, astronauts] = await Promise.all([
    getMissions(),
    getAstronauts(),
  ])

  // Get the latest 3 missions and astronauts for featured content
  const featuredMissions = missions.slice(0, 3)
  const featuredAstronauts = astronauts.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 text-glow">
            Explore the <span className="text-star-yellow">Cosmos</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover humanity's greatest adventures in space exploration through our comprehensive database 
            of missions, astronauts, and celestial wonders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/missions" className="cosmic-button">
              🚀 Explore Missions
            </Link>
            <Link href="/astronauts" className="cosmic-button">
              👨‍🚀 Meet Astronauts
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center cosmic-card">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-3xl font-bold text-star-yellow mb-2">{missions.length}</div>
              <div className="text-slate-300">Space Missions</div>
            </div>
            <div className="text-center cosmic-card">
              <div className="text-4xl mb-2">👨‍🚀</div>
              <div className="text-3xl font-bold text-star-yellow mb-2">{astronauts.length}</div>
              <div className="text-slate-300">Astronauts</div>
            </div>
            <div className="text-center cosmic-card">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-star-yellow mb-2">∞</div>
              <div className="text-slate-300">Discoveries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Missions */}
      {featuredMissions.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Missions</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Explore historic and current space missions that have shaped our understanding of the universe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/missions" className="cosmic-button">
                View All Missions
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Astronauts */}
      {featuredAstronauts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Space Pioneers</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Meet the brave men and women who have ventured beyond Earth's atmosphere.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAstronauts.map((astronaut) => (
                <AstronautCard key={astronaut.id} astronaut={astronaut} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/astronauts" className="cosmic-button">
                Meet All Astronauts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// Mission Card Component
function MissionCard({ mission }: { mission: Mission }) {
  const statusClass = mission.metadata.mission_status?.key 
    ? `status-${mission.metadata.mission_status.key}` 
    : 'cosmic-badge'

  return (
    <Link href={`/missions/${mission.slug}`} className="cosmic-card group hover:border-glow">
      {mission.metadata.mission_image && (
        <img
          src={`${mission.metadata.mission_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
          alt={mission.title}
          width={300}
          height={150}
          className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-star-yellow transition-colors">
            {mission.title}
          </h3>
          {mission.metadata.mission_status && (
            <span className={`cosmic-badge ${statusClass}`}>
              {mission.metadata.mission_status.value}
            </span>
          )}
        </div>
        {mission.metadata.agency && (
          <p className="text-slate-400 text-sm">{mission.metadata.agency}</p>
        )}
        {mission.metadata.launch_date && (
          <p className="text-slate-300 text-sm">
            🗓️ {new Date(mission.metadata.launch_date).toLocaleDateString()}
          </p>
        )}
        {mission.metadata.mission_objectives && (
          <p className="text-slate-300 text-sm line-clamp-3">
            {mission.metadata.mission_objectives}
          </p>
        )}
      </div>
    </Link>
  )
}

// Astronaut Card Component
function AstronautCard({ astronaut }: { astronaut: Astronaut }) {
  return (
    <Link href={`/astronauts/${astronaut.slug}`} className="cosmic-card group hover:border-glow">
      {astronaut.metadata.portrait && (
        <img
          src={`${astronaut.metadata.portrait.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={astronaut.title}
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-star-yellow transition-colors">
            {astronaut.title}
          </h3>
          {astronaut.metadata.still_active && (
            <span className="cosmic-badge bg-green-100 text-green-800">
              Active
            </span>
          )}
        </div>
        {astronaut.metadata.nationality && (
          <p className="text-slate-400 text-sm">🌍 {astronaut.metadata.nationality}</p>
        )}
        {astronaut.metadata.space_agency && (
          <p className="text-slate-300 text-sm">🚀 {astronaut.metadata.space_agency}</p>
        )}
        {astronaut.metadata.number_of_spaceflights && (
          <p className="text-slate-300 text-sm">
            ✈️ {astronaut.metadata.number_of_spaceflights} spaceflights
          </p>
        )}
      </div>
    </Link>
  )
}