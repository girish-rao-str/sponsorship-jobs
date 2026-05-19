# SponsorshipJobs

A job board for **visa sponsorship roles** in AI Security, Cybersecurity, Cloud Security, and AI Governance across Gulf, Europe, and Middle East.

## Features

- 20 curated jobs offering visa sponsorship
- Search by title, company, skills, or location
- Filter by country, work type, department, and experience
- Save jobs, track applications, hide irrelevant postings
- Job detail pages with full descriptions
- Responsive dark theme UI
- Built with Next.js 16 + Tailwind CSS 4

## Getting Started

```bash
cd sponsorship-jobs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project** and import your repo
4. Click **Deploy**

That's it. Your site will be live at `https://your-project.vercel.app`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage with job listings
│   ├── globals.css         # Global styles
│   └── about/
│       └── page.tsx        # About page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── SearchBar.tsx       # Search input
│   ├── FilterBar.tsx       # Filter dropdowns
│   ├── JobCard.tsx         # Job listing card
│   └── JobDetail.tsx       # Job detail view
└── data/
    └── jobs.ts             # Job data + filter options
```

## Adding More Jobs

Edit `src/data/jobs.ts` and add new entries to the `jobs` array. Each job follows this structure:

```ts
{
  id: string
  title: string
  company: string
  location: string
  workType: 'Remote' | 'Hybrid' | 'Onsite'
  salary?: string
  description: string
  skills: string[]
  sponsorship: boolean
  countries: string[]
  url: string
}
```
