import DeviceSpecificParameterObject = SpotifyApi.DeviceSpecificParameterObject
import CurrentPlaybackResponse = SpotifyApi.CurrentPlaybackResponse
import useSWR from 'swr'
import fetcher from './fetch'
import { useSession } from 'next-auth/react'

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
  // the cat meows and looks at the screen, and you can't see the cat.
  // but cat says at somewhere: "I'm here"
  // I'm scared because I can't see the cat.
  // And then suddenly appears and meows.
  // now you can see the cat.

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

export function usePlaybackState() {
  const { data: session } = useSession()
  const { data, error } = useSWR(
    [`https://api.spotify.com/v1/me/player`, session?.accessToken, 'get'],
    fetcher,
    { refreshInterval: 1000 }
  )

  return {
    playbackState: data as CurrentPlaybackResponse,
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
