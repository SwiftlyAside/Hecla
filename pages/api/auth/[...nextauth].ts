import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import * as querystring from 'querystring'
import { JWT } from 'next-auth/jwt'

async function refreshAccessToken(token: JWT) {
  function generateErrorResponse(error: unknown) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }

  try {
    const url = 'https://accounts.spotify.com/api/token'
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string
      })
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      return generateErrorResponse(refreshedTokens)
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    return generateErrorResponse(error)
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email%20app-remote-control%20streaming%20user-read-playback-state'
    })
  ],
  secret: process.env.SECRET,
  // jwt: {
  //   signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  // },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        console.log(account.scope)
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        // console.log(token.accessTokenExpires);
        return token
      }
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    }
  }
})
