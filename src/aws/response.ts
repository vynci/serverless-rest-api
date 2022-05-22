const ok = responseData => {
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
  };
};

const serverError = responseData => {
  return {
    statusCode: 500,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: typeof responseData === 'string' ? responseData : JSON.stringify(responseData)
  };
};

export { ok, serverError };
