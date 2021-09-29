import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { toBase64 } from "next/dist/shared/lib/to-base-64";
import * as querystring from "querystring";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
  function generateErrorResponse(error: unknown) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  try {
    const url = "https://accounts.spotify.com/api/token";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${toBase64(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        )}`,
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      return generateErrorResponse(refreshedTokens);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return generateErrorResponse(error);
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "user-read-email app-remote-control streaming",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        console.log(account.scope);
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log(token.accessTokenExpires);
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
