import { TComponent, TSchema } from "@edirect/form-engine";
import { v4 } from "uuid";
import { TPageSchema } from "../../dist/core/types";
import { mappings } from "./mappings/bolttech-components";

const transverseSchema = (
  schema: TPageSchema | TSchema,
  targetStep: number,
  cb: (component: TComponent[], index: number, currDepth: number) => void
) => {
  const transverse = (traversable: TComponent[], currDepth = 0) => {
    for (let localIndex = 0; localIndex < traversable.length; localIndex++) {
      cb(traversable, localIndex, currDepth);
      if (traversable[localIndex]?.children)
        transverse(traversable[localIndex].children, currDepth + 1);
    }
    return traversable;
  };

  // IF its a form component
  if (schema.components) {
    return {
      ...schema,
      components: schema.components.map((item, i) => {
        if (i !== targetStep) {
          return item;
        }

        return {
          ...item,
          children: transverse(item.children),
        };
      }),
    };
  }
  return transverse(schema);
};

const init = ({ configs }): { configs: any; page: TPageSchema } => ({
  configs,
  page: [],
});

const initForm = (): TSchema => ({
  components: [
    {
      component: "",
      name: "",
      children: [],
    },
  ],
});

const addToFormStep = (
  schema: TSchema,
  component: TComponent,
  step = 0
): TSchema => ({
  ...schema,
  components: schema.components.map((comp, index) => {
    if (index !== step) return comp;
    return {
      ...comp,
      children: [...comp.children, component],
    };
  }),
});

const buildPage = ({ configs, page }: { configs: any; page: TPageSchema }) => ({
  configs,
  page,
});

const add = (schema: TPageSchema, component: TComponent): TPageSchema => [
  ...schema,
  component,
];

const edit = (
  schema: TPageSchema,
  targetComponent: TComponent
): TPageSchema => {
  return transverseSchema(schema, 0, (component, localIndex) => {
    if (component[localIndex].id === targetComponent.id) {
      component[localIndex] = {
        ...component[localIndex],
        ...targetComponent,
      };
    }
  });
};

const buildComponent = ({
  name = Math.random().toString(36).slice(2, 7),
  component = "",
  props = {},
}): TComponent => ({
  component,
  id: v4(),
  name,
  props,
});

const buildTemplateComponent = (template): TComponent => ({
  id: v4(),
  name: Math.random().toString(36).slice(2, 7),
  ...template,
});

const cloneComponent = (component: TComponent): TComponent => ({
  ...component,
  id: v4(),
  name: Math.random().toString(36).slice(2, 7),
});

const remove = (schema: TPageSchema, step: number, component: TComponent) => {
  return transverseSchema(schema, step, (componentSet, localIndex) => {
    if (componentSet[localIndex].id === component.id) {
      componentSet.splice(localIndex, 1);
    }
  });
};

const arraymove = (arr: [any], fromIndex: number, toIndex: number) => {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};

const moveUp = (
  schema: TPageSchema,
  targetComponent: TComponent
): TPageSchema => {
  return transverseSchema(schema, 0, (component, localIndex) => {
    if (component[localIndex].id === targetComponent.id) {
      arraymove(component, localIndex, localIndex - 1);
    }
  });
};

const moveDown = (schema: TPageSchema, targetComponent: TComponent) => {
  return transverseSchema(schema, 0, (component, localIndex) => {
    if (component[localIndex].id === targetComponent.id) {
      arraymove(component, localIndex, localIndex + 1);
    }
  });
};

const moveTo = (
  schema: TPageSchema,
  from: TComponent,
  to: TComponent
): TPageSchema => {
  if (from.id === to?.id) return schema;

  remove(schema, 0, from);
  if (!to) {
    return transverseSchema(
      schema,
      0,
      (componentSet, localIndex, currDepth) => {
        if (localIndex === 0 && currDepth === 0) {
          componentSet.push(from);
        }
      }
    );
  }
  return transverseSchema(schema, 0, (componentSet, localIndex) => {
    if (componentSet[localIndex].id === to.id) {
      if (
        to.component === "__FORM__CONTAINER__" ||
        mappings[to.component].isContainer ||
        Array.isArray(to.children)
      ) {
        componentSet[localIndex].children = [
          ...(componentSet[localIndex].children || []),
          from,
        ];
      } else {
        componentSet.splice(localIndex + 1, 0, from);
      }
    }
  });
};

export {
  init,
  initForm,
  add,
  addToFormStep,
  buildComponent,
  buildTemplateComponent,
  edit,
  moveTo,
  remove,
  moveUp,
  moveDown,
  transverseSchema,
  cloneComponent,
  buildPage,
};
