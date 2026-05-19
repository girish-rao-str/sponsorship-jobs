import type { Job } from '@/data/jobs'

interface JobDetailProps {
  job: Job
  isSaved: boolean
  isApplied: boolean
  onSave: () => void
  onApply: () => void
}

export default function JobDetail({ job, isSaved, isApplied, onSave, onApply }: JobDetailProps) {
  const logoUrl = job.logo || `https://www.google.com/s2/favicons?domain=${job.companyDomain || job.company.toLowerCase().replace(/\s+/g, '') + '.com'}&sz=128`

  return (
    <div className="bg-slate-800/20 border border-slate-700/30 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700/30">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-slate-700/50 border border-slate-600/30 flex items-center justify-center overflow-hidden shrink-0">
            {job.logo ? (
              <img src={logoUrl} alt={job.company} className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-2xl font-bold text-indigo-400">{job.company.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white">{job.title}</h1>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide border border-emerald-500/20">
                Visa Sponsorship
              </span>
            </div>
            <p className="text-slate-400 mt-1">{job.company}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-400 flex-wrap">
              <span>{job.location}</span>
              <span className="text-slate-600">·</span>
              <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                job.workType === 'Remote' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                job.workType === 'Hybrid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {job.workType}
              </span>
              {job.experience && (
                <>
                  <span className="text-slate-600">·</span>
                  <span>{job.experience}</span>
                </>
              )}
              {job.salary && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-emerald-400 font-semibold">{job.salary}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {job.description && (
          <div>
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">About the Role</h2>
            <p className="text-slate-400 leading-relaxed">{job.description}</p>
          </div>
        )}

        {job.skills.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-700/30 text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-600/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {job.department && (
            <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20">
              <p className="text-xs text-slate-500 mb-1">Department</p>
              <p className="text-sm font-medium text-white">{job.department}</p>
            </div>
          )}
          <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20">
            <p className="text-xs text-slate-500 mb-1">Work Type</p>
            <p className="text-sm font-medium text-white">{job.workType}</p>
          </div>
          <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20">
            <p className="text-xs text-slate-500 mb-1">Posted</p>
            <p className="text-sm font-medium text-white">{job.postedAgo}</p>
          </div>
          <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20">
            <p className="text-xs text-slate-500 mb-1">Sponsorship</p>
            <p className="text-sm font-medium text-emerald-400">Available</p>
          </div>
        </div>

        {job.companyDescription && (
          <div>
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">About {job.company}</h2>
            <p className="text-slate-400">{job.companyDescription}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-slate-700/30">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onApply}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl transition font-medium text-center"
          >
            {isApplied ? 'Applied - View Posting' : 'Apply Now'}
          </a>
          <button
            onClick={onSave}
            className={`px-6 py-3 rounded-xl border transition ${
              isSaved
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
