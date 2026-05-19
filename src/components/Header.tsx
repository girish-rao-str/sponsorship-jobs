import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="text-xl font-bold">
            <span className="text-blue-400">Sponsorship</span>
            <span className="text-white">Jobs</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-slate-300 hover:text-white transition">
            Jobs
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition">
            About
          </Link>
          <a
            href="https://docs.google.com/forms"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
          >
            Add Company
          </a>
        </nav>
      </div>
    </header>
  )
}
