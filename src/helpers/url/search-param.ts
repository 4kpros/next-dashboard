// Set
export const setSearchParam = (url: string, param: string, value: string) => {
  const newUrl = new URL(url);
  newUrl.searchParams.set(param, value);
};
export const setMultipleSearchParam = (
  url: string,
  params: {
    param: string;
    value: string;
  }[]
) => {
  const newUrl = new URL(url);
  for (let i = 0; i < params.length; i++) {
    newUrl.searchParams.set(params[i].param, params[i].value);
  }
  return newUrl;
};

// Delete
export const deleteSearchParam = (url: string, param: string) => {
  const newUrl = new URL(url);
  newUrl.searchParams.delete(param);
};
export const deleteMultipleSearchParam = (url: string, params: string[]) => {
  const newUrl = new URL(url);
  for (let i = 0; i < params.length; i++) {
    newUrl.searchParams.delete(params[i]);
  }
  return newUrl;
};
