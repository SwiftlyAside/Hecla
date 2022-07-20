import DeviceSpecificParameterObject = SpotifyApi.DeviceSpecificParameterObject
import useSWR from 'swr'
import fetcher from './fetch'

export async function checkTracksStatus(
  token: string,
  tracks: string | string[]
) {
  const ids = Array.isArray(tracks) ? tracks : [tracks]

  return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

// export async function getDevices(token: string) {
//   return fetch(`https://api.spotify.com/v1/me/player/devices`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   }).then(res => res.json())
// }

export function useDevices(token: string) {
  const { data, error } = useSWR(
    [`https://api.spotify.com/v1/me/player/devices`, token, 'get'],
    fetcher,
    { refreshInterval: 1000 }
  )

  return {
    devices: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useSearchResults(token: string, query: string) {
  const { data, error } = useSWR(
    [`https://api.spotify.com/v1/search?q=${query}&type=track`, token, 'get'],
    fetcher,
    {}
  )

  return {
    results: data,
    isLoading: !error && !data,
    isError: error
  }
}

export async function play(
  token: string,
  { context_uri, device_id, offset = 0, uris }: DeviceSpecificParameterObject
) {
  let body

  if (context_uri) {
    const isArtist = context_uri.indexOf('artist') >= 0
    let position

    /* istanbul ignore else */
    if (!isArtist) {
      position = { position: offset }
    }

    body = JSON.stringify({ context_uri, offset: position })
  } else if (Array.isArray(uris) && uris.length) {
    body = JSON.stringify({ uris, offset: { position: offset } })
  }

  return fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    }
  )
}
