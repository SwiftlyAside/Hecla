const fetcher = async (
  input: string,
  accessToken: string | null,
  method: string,
  ...args: any[]
) => {
  const result = await fetch(input, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result.json();
};

export default fetcher;
