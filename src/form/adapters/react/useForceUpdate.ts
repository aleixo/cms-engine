import { useState } from 'react';

type TProps = [value: unknown, dispatch: () => void];

const useForceUpdate = (): TProps => {
  const [value, setValue] = useState(0); // integer state
  return [value, () => setValue((value) => value + 1)];
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
};

export { useForceUpdate };
