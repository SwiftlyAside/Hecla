import type { NextApiRequest, NextApiResponse } from "next";
import { toBase64 } from "next/dist/shared/lib/to-base-64";
import querystring from "querystring";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "https://accounts.spotify.com/api/token";
  const token = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${toBase64(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      )}`,
    },
    body: querystring.stringify({
      grant_type: "client_credentials",
    }),
  }).then((res) => res.json());
  res.status(200).json(token);
}
