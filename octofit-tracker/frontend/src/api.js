export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  return []
}

export async function fetchItems(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return getItems(await response.json())
}