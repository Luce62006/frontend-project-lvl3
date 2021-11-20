const getUrlWithProxy = (url) => {
  const newUrl = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
  newUrl.searchParams.set('disableCache', 'true');

  newUrl.searchParams.set('url', url);
  return newUrl.toString();
};
export default getUrlWithProxy;
