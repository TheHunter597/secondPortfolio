import React, { useEffect } from "react";

export default function useCustomSync<T>(
  subscribe: (callback: (value: T) => void) => () => void,
  getSnapshot: () => T,
  selector: (value: T) => any
): any {
  const [value, setValue] = React.useState(getSnapshot);

  useEffect(() => {
    subscribe((val) => {
      if (value !== val) {
        setValue(val);
      }
    });
  }, []);
  return value;
}