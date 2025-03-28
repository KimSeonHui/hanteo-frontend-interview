export const getBanners = async () => {
  const response = await fetch('/json/banner.json');
  const data = await response.json();
  return data;
};
