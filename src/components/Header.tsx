import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold">
            <span className="text-indigo-400">Sponsorship</span>
            <span className="text-white">Jobs</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            Browse Jobs
          </Link>
          <Link href="/about" className="text-slate-400 hover:text-white transition">
            About
          </Link>
          <a
            href="https://github.com/girish-rao-str/sponsorship-jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
