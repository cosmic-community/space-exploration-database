import Link from 'next/link'
import { getAstronauts } from '@/lib/cosmic'
import type { Astronaut } from '@/types'

export const metadata = {
  title: 'Astronauts | Space Exploration Database',
  description: 'Meet the brave men and women who have ventured beyond Earth\'s atmosphere to explore the cosmos.',
}

export default async function AstronautsPage() {
  const astronauts = await getAstronauts()

  if (!astronauts || astronauts.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">👨‍🚀</div>
          <h1 className="text-4xl font-bold text-white mb-6">No Astronauts Found</h1>
          <p className="text-xl text-slate-300 mb-8">
            We're currently gathering astronaut profiles. Check back soon for inspiring stories of space pioneers!
          </p>
          <Link href="/" className="cosmic-button">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Space <span className="text-star-yellow">Pioneers</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Meet the extraordinary men and women who have pushed the boundaries of human exploration, 
            venturing beyond Earth's atmosphere to advance our understanding of the cosmos.
          </p>
        </div>

        {/* Astronauts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {astronauts.map((astronaut) => (
            <AstronautCard key={astronaut.id} astronaut={astronaut} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AstronautCard({ astronaut }: { astronaut: Astronaut }) {
  return (
    <Link href={`/astronauts/${astronaut.slug}`} className="cosmic-card group hover:border-glow">
      {astronaut.metadata.portrait && (
        <img
          src={`${astronaut.metadata.portrait.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={astronaut.title}
          width={300}
          height={300}
          className="w-full h-64 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-white group-hover:text-star-yellow transition-colors">
            {astronaut.title}
          </h2>
          {astronaut.metadata.still_active && (
            <span className="cosmic-badge bg-green-100 text-green-800 flex-shrink-0">
              Active
            </span>
          )}
        </div>
        
        {astronaut.metadata.full_name && astronaut.metadata.full_name !== astronaut.title && (
          <p className="text-slate-400 text-sm">{astronaut.metadata.full_name}</p>
        )}
        
        {astronaut.metadata.nationality && (
          <p className="text-slate-300 text-sm">🌍 {astronaut.metadata.nationality}</p>
        )}
        
        {astronaut.metadata.space_agency && (
          <p className="text-slate-300 text-sm">🚀 {astronaut.metadata.space_agency}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          {astronaut.metadata.number_of_spaceflights && (
            <div>
              <span className="text-slate-400">Spaceflights:</span>
              <div className="text-star-yellow font-medium">
                {astronaut.metadata.number_of_spaceflights}
              </div>
            </div>
          )}
          
          {astronaut.metadata.total_time_in_space && (
            <div>
              <span className="text-slate-400">Time in Space:</span>
              <div className="text-star-yellow font-medium text-xs">
                {astronaut.metadata.total_time_in_space}
              </div>
            </div>
          )}
        </div>
        
        {astronaut.metadata.birth_date && (
          <p className="text-slate-300 text-sm">
            🎂 Born: {new Date(astronaut.metadata.birth_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  )
}