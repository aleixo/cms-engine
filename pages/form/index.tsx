import React, { useRef, useState } from "react";
import {
  Form,
  FormProvider,
  TComponent,
  TField,
  TSchema,
} from "@edirect/form-engine";

import { ComponentsPanel } from "../../components/mapped-components/mapped-components";
import { ComponentConfigurations } from "../../components/component-configurations/component-configurations";
import * as mappings from "../../common/mappings";
import * as schema from "../../common/schema";
import { PreviewContainer } from "../../components/form-field-wrapper/form-field-wrapper";
import { ComponentsHierarchy } from "../../components/components-hierarchy/components-hierarchy";
import { Grid, Button, Stack, InputLabel, Input } from "@mui/material";
import * as S from "./form.styles";

const SCHEMA_KEY = "form_json";

const BuilderPage = () => {
  const [formColor, setFormColor] = useState("#ffffff");
  const [ui] = useState(mappings.bolttech);
  const draggingElementRef = useRef<TComponent & TField>(null);
  const [overedComponent, setOveredComponent] = useState<TComponent & TField>(
    null
  );

  const [formKey, setFormKey] = useState(new Date().getTime());
  const [buildingSchema, setBuildingSchema] = useState<TSchema>(
    schema.initForm()
  );

  const [selected, setSelected] = useState<
    { component: TComponent; field: TField } | undefined
  >(undefined);

  const reloadBuilderForm = (schema?: TSchema) => {
    if (!schema) return;
    setBuildingSchema(schema);
    setFormKey(new Date().getTime());
  };

  const handleComponentClick = (key: string) => {
    reloadBuilderForm(
      schema.addToFormStep(
        buildingSchema,
        schema.buildComponent({ component: key, props: ui.examples[key] })
      )
    );
  };

  const onPreviewClick = () => {
    window.localStorage.setItem(SCHEMA_KEY, JSON.stringify(buildingSchema));
    window.open(`/preview?key=${SCHEMA_KEY}`, "_blank");
  };

  return (
    <FormProvider
      mapper={ui.mappings}
      propsMapping={ui.formBuilderPropsMapping}
    >
      <Grid container direction="column">
        <Grid item xs={2}>
          <Stack direction={"row"} spacing={3}>
            <Button
              variant="contained"
              onClick={(e) => {
                window.localStorage.setItem(
                  SCHEMA_KEY,
                  JSON.stringify(buildingSchema)
                );
              }}
            >
              save to local
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                const loadedSchema = window.localStorage.getItem(SCHEMA_KEY);

                if (!loadedSchema) return;
                reloadBuilderForm(JSON.parse(loadedSchema));
              }}
            >
              load from local
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                document.querySelector(`#${SCHEMA_KEY}`).click();
              }}
            >
              load from JSON
            </Button>

            <Input
              style={{ display: "none" }}
              type="file"
              id={SCHEMA_KEY}
              name={SCHEMA_KEY}
              onChange={(event) => {
                // Stop the form from reloading the page
                event.preventDefault();
                const file = document.querySelector("#form_json");
                // If there's no file, do nothing
                if (!file?.value?.length) return;

                // Create a new FileReader() object
                let reader = new FileReader();

                // Setup the callback event to run when the file is read
                reader.onload = (readerEvent) => {
                  reloadBuilderForm(JSON.parse(readerEvent.target.result));
                };

                // Read the file
                reader.readAsText(file.files[0]);
              }}
            />

            <Button
              variant="contained"
              onClick={(e) => {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                  JSON.stringify(buildingSchema)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = "form.json";

                link.click();
              }}
            >
              save to JSON
            </Button>
            <Button variant="contained" onChange={onPreviewClick}>
              Preview
            </Button>
            <input
              type="color"
              value={formColor}
              onChange={(event) => {
                setFormColor(event.target.value);
              }}
            />
          </Stack>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <S.BuilderContainer
              style={{
                backgroundColor: formColor,
              }}
              onClick={() => {
                setSelected(undefined);
                setFormKey(new Date().getTime());
              }}
              draggable
              onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(event) => {
                event.stopPropagation();
                setOveredComponent(null);
                setSelected(undefined);
                console.log("aqui");
                reloadBuilderForm(
                  schema.moveTo(
                    buildingSchema,
                    draggingElementRef.current?.component,
                    undefined
                  )
                );
              }}
            >
              <Form
                key={formKey}
                schema={buildingSchema}
                renderFieldWrapper={(component, field, children) => (
                  <PreviewContainer
                    onDragStart={() => {
                      setSelected(undefined);
                      draggingElementRef.current = { field, component };
                    }}
                    onDragOver={() => setOveredComponent(component)}
                    onDrop={() => {
                      setOveredComponent(null);
                      setSelected(undefined);
                      console.log("aqui");
                      reloadBuilderForm(
                        schema.moveTo(
                          buildingSchema,
                          draggingElementRef.current?.component,
                          component
                        )
                      );
                    }}
                    onClick={() => {
                      setOveredComponent(null);
                      setFormKey(new Date().getTime());
                      setSelected({
                        component,
                        field,
                      });
                    }}
                    selected={selected?.component.name === component.name}
                    component={component}
                  >
                    {children}
                  </PreviewContainer>
                )}
              />
            </S.BuilderContainer>
          </Grid>
          <Grid item xs={4}>
            {!selected && (
              <>
                <ComponentsPanel
                  components={{ ...ui.mappings, ...mappings.base.mappings }}
                  onComponentClick={handleComponentClick}
                />
                <ComponentsHierarchy
                  configuredSchema={buildingSchema}
                  overed={overedComponent}
                  selected={selected}
                />
              </>
            )}

            {!!selected && (
              <ComponentConfigurations
                onClone={() => {
                  reloadBuilderForm(
                    schema.add(
                      buildingSchema,
                      schema.cloneComponent(selected.component)
                    )
                  );
                }}
                propsMapping={ui.props[selected.component.component]}
                key={selected.component.name}
                component={selected.component}
                onClose={() => {
                  setSelected(undefined);
                  setFormKey(new Date().getTime());
                }}
                onSave={(component: TComponent) => {
                  reloadBuilderForm(schema.edit(buildingSchema, component));
                }}
                onDelete={() => {
                  setSelected(undefined);
                  reloadBuilderForm(
                    schema.remove(buildingSchema, 0, selected.component)
                  );
                }}
                onUp={() => {
                  setSelected(undefined);
                  reloadBuilderForm(
                    schema.moveUp(buildingSchema, selected.component)
                  );
                }}
                onDown={() => {
                  setSelected(undefined);
                  reloadBuilderForm(
                    schema.moveDown(buildingSchema, selected.component)
                  );
                }}
              />
            )}
            {!!selected && (
              <ComponentsHierarchy
                configuredSchema={buildingSchema}
                selected={selected?.component}
                overed={overedComponent}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default BuilderPage;
