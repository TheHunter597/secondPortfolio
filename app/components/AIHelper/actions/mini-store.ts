function createStore(init: any) {
  let currentValue = init;
  const listeners = new Map<string, (val: any) => void>();

  return {
    get() {
      return currentValue;
    },

    set(newValue: any) {
      if (newValue !== currentValue) {
        currentValue = newValue;
        listeners.forEach((listener) => listener(currentValue));
      }
    },

    subscribe(callback: (val: any) => void) {
      if (typeof callback !== "function") {
        throw new Error("Callback must be a function");
      }

      const id = Math.random().toString(36).substring(2, 15);
      listeners.set(id, callback);

      // Optional: Immediately emit current value
      callback(currentValue);

      return () => {
        listeners.delete(id);
        console.log(`Listener ${id} unsubscribed`);
      };
    },
  };
}

export function createStoreWithInit(init: any) {
  if (typeof init !== "object" || init === null) {
    throw new Error("Initial value must be a non-null object");
  }

  return createStore(init);
}
const stores = {
  pageReloadStore: createStoreWithInit({
    reloadPage: false,
  }),
};
export default stores;