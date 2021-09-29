import { Session } from "next-auth";

const fetcher = async (input: string, session: Session | null, method: string, ...args: any[]) => {
  const result = await fetch(input, {
    method: method,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return result.json();
};

export default fetcher;
