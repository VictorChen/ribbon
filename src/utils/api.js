export const fetchTickers = async query => {
  // HACK to get around the Access-Control-Allow-Origin error
  const CORS_HACK = 'https://cors-anywhere.herokuapp.com/';
  const url = `${CORS_HACK}http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US`;
  const response = await fetch(url);
  return await response.json();
};
