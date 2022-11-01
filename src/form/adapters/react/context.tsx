import React from 'react';
import { createContext, ReactElement } from 'react';

import * as T from './types';

const FormContext = createContext<T.TContext>({} as T.TContext);
FormContext.displayName = 'FormContext';

const FormProvider = ({ children, mapper, propsMapping }: T.TProvider): ReactElement => {
  return (
    <FormContext.Provider
      value={{
        mapper,
        propsMapping,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
