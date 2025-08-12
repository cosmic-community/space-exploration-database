import Link from 'next/link'
import { getMissions } from '@/lib/cosmic'
import type { Mission } from '@/types'

export const metadata = {
  title: 'Space Missions | Space Exploration Database',
  description: 'Explore historic and current space missions from NASA and other space agencies around the world.',
}

export default async function MissionsPage() {
  const missions = await getMissions()

  if (!missions || missions.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-4xl font-bold text-white mb-6">No Missions Found</h1>
          <p className="text-xl text-slate-300 mb-8">
            We're currently gathering mission data. Check back soon for updates on space exploration missions!
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
            Space <span className="text-star-yellow">Missions</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover humanity's greatest adventures in space exploration, from historic moon landings 
            to cutting-edge Mars missions and beyond.
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>
    </div>
  )
}

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
          className="w-full h-48 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-white group-hover:text-star-yellow transition-colors">
            {mission.title}
          </h2>
          {mission.metadata.mission_status && (
            <span className={`cosmic-badge ${statusClass}`}>
              {mission.metadata.mission_status.value}
            </span>
          )}
        </div>
        
        {mission.metadata.agency && (
          <p className="text-slate-400 text-sm font-medium">🏛️ {mission.metadata.agency}</p>
        )}
        
        {mission.metadata.launch_date && (
          <p className="text-slate-300 text-sm">
            🗓️ Launched: {new Date(mission.metadata.launch_date).toLocaleDateString()}
          </p>
        )}
        
        {mission.metadata.destination && (
          <p className="text-slate-300 text-sm">🎯 Destination: {mission.metadata.destination}</p>
        )}
        
        {mission.metadata.mission_objectives && (
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
            {mission.metadata.mission_objectives}
          </p>
        )}
        
        {mission.metadata.crew_members && mission.metadata.crew_members.length > 0 && (
          <div className="text-slate-300 text-sm">
            <span className="font-medium">👨‍🚀 Crew:</span>
            <div className="mt-1">
              {mission.metadata.crew_members.slice(0, 3).map((member, index) => (
                <span key={member.id} className="text-slate-400">
                  {member.title}
                  {index < Math.min(mission.metadata.crew_members?.length || 0, 3) - 1 ? ', ' : ''}
                </span>
              ))}
              {mission.metadata.crew_members.length > 3 && (
                <span className="text-slate-400"> +{mission.metadata.crew_members.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}