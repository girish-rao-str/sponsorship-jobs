import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || 'AI security'
  const page = searchParams.get('page') || '1'
  const location = searchParams.get('location') || ''

  const apiKey = process.env.JSEARCH_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured', fallback: true }, { status: 200 })
  }

  try {
    const url = new URL('https://jsearch.p.rapidapi.com/search')
    url.searchParams.set('query', query)
    url.searchParams.set('page', page)
    url.searchParams.set('num_pages', '1')
    if (location) url.searchParams.set('location', location)

    const response = await fetch(url.toString(), {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
