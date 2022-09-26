import DeviceSpecificParameterObject = SpotifyApi.DeviceSpecificParameterObject
import CurrentPlaybackResponse = SpotifyApi.CurrentPlaybackResponse
import useSWR from 'swr'
import fetcher from './fetch'
import { useSession } from 'next-auth/react'
import SearchResponse = SpotifyApi.SearchResponse
import SearchForItemParameterObject = SpotifyApi.SearchForItemParameterObject
import UserDevicesResponse = SpotifyApi.UserDevicesResponse

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
  const { data, error } = useSWR<UserDevicesResponse>(
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

export function useSearchResults(
  token: string,
  { q, type }: SearchForItemParameterObject
) {
  const { data, error } = useSWR<SearchResponse>(
    [`https://api.spotify.com/v1/search?q=${q}&type=${type}`, token, 'get'],
    fetcher,
    {}
  )

  return {
    results: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function usePlaybackState() {
  const { data: session } = useSession()
  const { data, error } = useSWR<CurrentPlaybackResponse>(
    [`https://api.spotify.com/v1/me/player`, session?.accessToken, 'get'],
    fetcher,
    { refreshInterval: 1000 }
  )

  return {
    playbackState: data,
    isLoading: !error && !data,
    isError: error || (data && 'error' in data)
  }
}

export async function play(
  token: string,
  { context_uri, device_id, offset = 0, uris }: DeviceSpecificParameterObject
) {
  let body

  if (context_uri) {
    const isArtist = context_uri.indexOf('artist') >= 0
    let offset_body

    /* istanbul ignore else */
    if (!isArtist) {
      offset_body =
        typeof offset === 'number' ? { position: offset } : { uri: offset }
    }

    body = JSON.stringify({ context_uri, offset: offset_body })
  } else if (Array.isArray(uris) && uris.length) {
    body = JSON.stringify({ uris, offset: { position: offset } })
  }

  return fetch(
    `https://api.spotify.com/v1/me/player/play${
      device_id ? `?device_id=${device_id}` : ''
    }`,
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
