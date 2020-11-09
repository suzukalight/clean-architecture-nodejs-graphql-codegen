type Variables = {
  input?: Object;
};

export const fetchFromBackend = async (query: string, variables?: Variables) => {
  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json?.errors) throw new Error(json.errors.toString());

  return json;
};
