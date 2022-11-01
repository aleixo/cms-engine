import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  FormProvider,
  Page,
  TComponent,
  TField,
} from "@edirect/form-engine";

import * as S from "./builder.styles";
import { ComponentsPanel } from "../../components/mapped-components/mapped-components";
import { ComponentConfigurations } from "../../components/component-configurations/component-configurations";
import * as mappings from "../../common/mappings";
import * as schema from "../../common/schema";
import { PreviewContainer } from "../../components/form-field-wrapper/form-field-wrapper";
import { fetchBins, readBin, updateBin } from "../../common/json-bin";
import { ComponentsHierarchy } from "../../components/components-hierarchy/components-hierarchy";
import { TPageSchema } from "@edirect/form-engine";
import { Toolbar } from "../../components/toolbar/toolbar";
import { Grid, IconButton } from "@mui/material";
import { PageConfigurations } from "../../components/page-configurations/page-configurations";
import { Close } from "@mui/icons-material";
import { TemplateComponents } from "../../components/template-components/template-components";

const SCHEMA_KEY = "draft";

enum ELeftMenuItems {
  HIERARCHY = "HIERARCHY",
  COMPONENT_CONFIGS = "COMPONENT_CONFIGS",
  PAGE_CONFIGS = "PAGE_CONFIGS",
  AVAILABLE_COMPONENTS = "AVAILABLE_COMPONENTS",
}

const BuilderPage = () => {
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(null);
  const [leftMenuView, setLeftMenuView] = useState<ELeftMenuItems>(
    ELeftMenuItems.HIERARCHY
  );
  const [ui] = useState(mappings.bolttech);
  const router = useRouter();
  const draggingElementRef = useRef<TComponent & TField>(null);
  const [overedComponent, setOveredComponent] = useState<
    (TComponent & TField) | null
  >(null);

  const [formKey, setFormKey] = useState(new Date().getTime());
  const [buildingSchema, setBuildingSchema] = useState<TPageSchema | null>(
    null
  );
  const [selected, setSelected] = useState<
    { component: TComponent; field: TField } | undefined
  >(undefined);

  const reloadBuilderForm = (schema?: { page: TPageSchema }) => {
    if (!schema) return;
    setBuildingSchema(schema);
    setFormKey(new Date().getTime());
  };

  const handleComponentClick = (key: string) =>
    reloadBuilderForm(
      schema.add(
        buildingSchema,
        schema.buildComponent({ component: key, props: ui.examples[key] })
      )
    );

  const handleTemplateComponentClick = (template) =>
    reloadBuilderForm(
      schema.add(buildingSchema, schema.buildTemplateComponent(template))
    );

  const mountBin = useCallback(async () => {
    const res = await readBin(router.query.id as string);
    setPage(res.record);
    reloadBuilderForm(res.record.page);
  }, [router.query.id]);

  const getBins = async () => {
    const bins = await fetchBins();
    setPages(bins);
  };

  useEffect(() => {
    setLeftMenuView(ELeftMenuItems.PAGE_CONFIGS);
    getBins();

    if (!router.query.id) {
      setPages(null);
      setPage(null);
      return;
    }
    mountBin();
  }, [mountBin, router.query.id]);

  const onPreviewClick = () => {
    window.localStorage.setItem(SCHEMA_KEY, JSON.stringify(buildingSchema));
    window.open(`/preview?key=${SCHEMA_KEY}`, "_blank");
  };

  const toggleLeftSideMenu = (next: ELeftMenuItems) => {
    if (!router.query.id) {
      setLeftMenuView(ELeftMenuItems.PAGE_CONFIGS);
      return;
    }
    setLeftMenuView(next);
  };

  return (
    <FormProvider
      mapper={ui.mappings}
      propsMapping={ui.formBuilderPropsMapping}
    >
      <Grid
        container
        direction="column"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid item xs={2}>
          <Toolbar
            onHierarchyClick={() =>
              toggleLeftSideMenu(ELeftMenuItems.HIERARCHY)
            }
            onListClick={() =>
              toggleLeftSideMenu(ELeftMenuItems.AVAILABLE_COMPONENTS)
            }
            onSaveClick={() =>
              updateBin(
                schema.buildPage({
                  configs: page.configs,
                  page: buildingSchema,
                }),
                router.query.id
              )
            }
            onPreviewClick={onPreviewClick}
            onSettingsClick={() =>
              toggleLeftSideMenu(ELeftMenuItems.PAGE_CONFIGS)
            }
            pages={pages}
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <S.BuilderContainer
                onClick={() => {
                  setSelected(undefined);
                  setFormKey(new Date().getTime());
                  setLeftMenuView(null);
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
                  setOveredComponent(null);
                  event.stopPropagation();
                  setSelected(undefined);
                  reloadBuilderForm(
                    schema.moveTo(
                      buildingSchema,
                      draggingElementRef.current?.component,
                      undefined
                    )
                  );
                }}
              >
                {buildingSchema && (
                  <Page
                    key={formKey}
                    schema={buildingSchema}
                    renderFieldWrapper={(component, field, children) => (
                      <PreviewContainer
                        onDragStart={() => {
                          setSelected(undefined);
                          draggingElementRef.current = { field, component };
                        }}
                        onDragOver={() => {
                          setOveredComponent(component);
                        }}
                        onDrop={() => {
                          setOveredComponent(null);

                          setSelected(undefined);
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
                          leftMenuView !== ELeftMenuItems.HIERARCHY &&
                            setLeftMenuView(ELeftMenuItems.COMPONENT_CONFIGS);
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
                )}
              </S.BuilderContainer>
            </Grid>
            {leftMenuView && (
              <Grid item xs={4}>
                <S.LeftPanelContainer>
                  <IconButton
                    onClick={() => {
                      setLeftMenuView(null);
                    }}
                  >
                    <Close />
                  </IconButton>
                  {leftMenuView === ELeftMenuItems.AVAILABLE_COMPONENTS && (
                    <ComponentsPanel
                      components={{ ...ui.mappings, ...mappings.base.mappings }}
                      onComponentClick={handleComponentClick}
                    />
                  )}
                  {leftMenuView === ELeftMenuItems.AVAILABLE_COMPONENTS && (
                    <TemplateComponents
                      components={{ ...ui.mappings, ...mappings.base.mappings }}
                      onComponentClick={handleTemplateComponentClick}
                    />
                  )}

                  {!!selected &&
                    leftMenuView === ELeftMenuItems.COMPONENT_CONFIGS && (
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
                          reloadBuilderForm(
                            schema.edit(buildingSchema, component)
                          );
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
                  {leftMenuView === ELeftMenuItems.PAGE_CONFIGS && (
                    <PageConfigurations page={page} />
                  )}
                  {(leftMenuView === ELeftMenuItems.HIERARCHY ||
                    leftMenuView === ELeftMenuItems.AVAILABLE_COMPONENTS ||
                    (!!selected &&
                      leftMenuView === ELeftMenuItems.COMPONENT_CONFIGS)) && (
                    <ComponentsHierarchy
                      configuredSchema={buildingSchema}
                      selected={selected?.component}
                      overed={overedComponent}
                    />
                  )}
                </S.LeftPanelContainer>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default BuilderPage;
