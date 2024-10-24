export default async function searchAll(query: string) {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  try {
    const response = await fetch(`${API_URL}/user/globalsearch?search=${query}`)

    if (!response.ok) {
      throw new Error('Failed to fetch search results')
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error in global search:', error)
    return {}
  }
}