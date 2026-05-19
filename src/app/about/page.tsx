import Header from '@/components/Header'

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
          About <span className="text-blue-400">Sponsorship</span>Jobs
        </h1>

        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            SponsorshipJobs is a job board dedicated to helping professionals find roles that offer <strong className="text-white">visa sponsorship</strong> across the Gulf, Europe, and Middle East regions.
          </p>

          <p>
            We focus on high-demand fields including <strong className="text-white">AI Security, Cybersecurity, Cloud Security, AI Governance, and AI Safety</strong> - areas where companies are actively seeking global talent and willing to sponsor visas.
          </p>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Why SponsorshipJobs?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Every job listed explicitly offers visa sponsorship</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Curated for cybersecurity and AI security professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Focus on Gulf (UAE, Saudi Arabia, Qatar), Europe, and Middle East</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Filter by role, location, work type, and experience level</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Save jobs, track applications, and hide irrelevant postings</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Target Regions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-white mb-2">Gulf & Middle East</h3>
                <p className="text-sm">UAE, Saudi Arabia, Qatar, Bahrain, Oman, Kuwait</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Europe</h3>
                <p className="text-sm">UK, Germany, Ireland, Netherlands, France</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Know a company hiring with sponsorship?</h2>
            <p className="mb-4">
              Help the community by submitting companies that offer visa sponsorship.
            </p>
            <a
              href="https://docs.google.com/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg transition font-medium"
            >
              Submit a Company
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
