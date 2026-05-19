interface StatsProps {
  totalJobs: number
  apiJobs: number
  hasApiKey: boolean
}

export default function Stats({ totalJobs, apiJobs, hasApiKey }: StatsProps) {
  const stats = [
    { label: 'Total Jobs', value: totalJobs.toLocaleString(), icon: 'briefcase' },
    { label: 'Live from APIs', value: hasApiKey ? apiJobs.toLocaleString() : '—', icon: 'bolt' },
    { label: 'Countries', value: '15+', icon: 'globe' },
    { label: 'Companies', value: '50+', icon: 'building' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
