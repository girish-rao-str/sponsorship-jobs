export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold">
                <span className="text-indigo-400">Sponsorship</span>Jobs
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Helping professionals find visa sponsorship jobs in AI Security, Cybersecurity, and Cloud Security worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Job Sources</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>LinkedIn</li>
              <li>Indeed</li>
              <li>Glassdoor</li>
              <li>Company Career Pages</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Top Regions</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>UAE & Gulf States</li>
              <li>Saudi Arabia</li>
              <li>United Kingdom</li>
              <li>Germany & Europe</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 SponsorshipJobs. Built for the global security community.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="/about" className="hover:text-slate-400 transition">About</a>
            <a href="https://github.com/girish-rao-str/sponsorship-jobs" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
