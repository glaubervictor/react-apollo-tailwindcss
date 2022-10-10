const getItem = (key: string) => {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data ?? "");
  } catch (err) {
    return data;
  }
};

const setItem = (key: string, value: any) => {
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const clear = () => {
  localStorage.clear();
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem, clear };
