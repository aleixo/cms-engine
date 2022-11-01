import React from 'react';
import { ReactElement } from 'react';
import * as T from './types.js';
declare const FormContext: React.Context<T.TContext>;
declare const FormProvider: ({ children, mapper, propsMapping }: T.TProvider) => ReactElement;
export { FormContext, FormProvider };
