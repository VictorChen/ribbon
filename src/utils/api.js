/**
 * Only goes back 5 years, not more :(
 *
 * Hope they fix it soon:
 * https://github.com/iexg/IEX-API/issues/24
 */
export const fetchTickerHistory = async ticker => {
  const url = `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`;
  const response = await fetch(url);
  return await response.json();
};

export const fetchTickers = async query => {
  // HACK to get around the Access-Control-Allow-Origin error
  const CORS_HACK = 'https://cors-anywhere.herokuapp.com/';
  const url = `${CORS_HACK}http://d.yimg.com/aq/autoc?query=${query}&region=US&lang=en-US`;
  const response = await fetch(url);
  return await response.json();
};
