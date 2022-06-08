import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "https://accounts.spotify.com/api/token";
  const token = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: querystring.stringify({
      grant_type: "client_credentials",
    }),
  }).then((res) => res.json());
  res.status(200).json(token);
}
