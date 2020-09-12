class InMemoryStorage {
  cache: Map<string, string> = new Map();

  setItem = (key: string, val: string) => {
    this.cache.set(key, val);
  };

  getItem = (key: string) => {
    return this.cache.get(key);
  };

  removeItem = (key: string) => {
    this.cache.delete(key);
  };
}

const getStorage = () => global?.window?.localStorage ?? new InMemoryStorage();

export const setItem = (key: string, val: string) => {
  getStorage().setItem(key, val);
};

export const getItem = (key: string) => {
  return getStorage().getItem(key);
};

export const removeItem = (key: string) => {
  getStorage().removeItem(key);
};
