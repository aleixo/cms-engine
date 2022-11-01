import React, { useMemo } from 'react';
import { useState } from 'react';

const withAsyncComponentResolution =
  <T,>(Comp: any) =>
  (props: T & { async: boolean; wrapper: any }) => {
    const [targetProps, setTargetProps] = useState(props);
    const [loadedMappingComponent, setLoadedMappingComponent] = useState(!props.async);

    useMemo(async () => {
      let Element = props.wrapper;

      if (loadedMappingComponent) return;
      Element = await props.wrapper();

      setTargetProps({
        ...targetProps,
        wrapper: Element,
      });
      setLoadedMappingComponent(true);
    }, []);

    if (!loadedMappingComponent) return <></>;

    return <Comp {...targetProps} />;
  };

export { withAsyncComponentResolution };
