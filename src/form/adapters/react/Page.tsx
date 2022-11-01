import React, { useContext } from 'react';

import Form from './Form';
import { TComponent, TPageProps } from './types';
import { FormContext } from './context';

const Page = ({ schema, renderFieldWrapper }: TPageProps) => {
  const { mapper: Mapper } = useContext(FormContext);

  const Child = () => {
    const generateComponentChildren = (children: TComponent[], componentLevel = 0): any => {
      return children?.map((component) => {
        if (component.component === '__FORM__CONTAINER__') {
          const { children, ...rest } = component;
          const schema = {
            ...(rest as any),
            components: [{ component: '', name: '', children: component.children }],
          };
          if (renderFieldWrapper) {
            return renderFieldWrapper(
              schema,
              {} as any,
              <Form renderFieldWrapper={renderFieldWrapper} id={component.name} schema={schema} />,
            );
          }
          return <Form renderFieldWrapper={renderFieldWrapper} id={component.name} schema={schema} />;
        }
        const Element = Mapper[component.component as string]?.component;
        if (renderFieldWrapper) {
          return renderFieldWrapper(
            component,
            {} as any,
            <Element {...component.props}>
              {Array.isArray(component.children)
                ? generateComponentChildren(component.children, componentLevel + 1)
                : component.children}
            </Element>,
          );
        }

        return (
          <Element {...component.props}>
            {Array.isArray(component.children)
              ? generateComponentChildren(component.children, componentLevel + 1)
              : component.children}
          </Element>
        );
      });
    };
    return generateComponentChildren(schema);
  };

  return Child();
};

export default Page;
