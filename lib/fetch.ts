const fetcher = async (
  input: string,
  accessToken: string | null,
  method: string
) => {
  const result = await fetch(input, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!result.ok) {
    // Attach extra info to the error object.
    // error.info = await result.json()
    // error.status = result.status
    throw new Error(await result.json())
  }

  return result.json()
}

export default fetcher
