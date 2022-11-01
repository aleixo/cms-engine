import { Form, FormProvider, Page, TFormRefActions } from '@edirect/form-engine';
import { useEffect, useRef, useState } from 'react';
import { mappings, formBuilderPropsMapping } from '../../common/mappings/bolttech-components';
import * as S from './preview.styles';

const Preview = () => {
    const [schema, setSchema] = useState();

    useEffect(() => {
        setSchema(JSON.parse(window.localStorage.getItem('draft') || '{}'))
    }, [])

    if (!schema) return <></>
    return (
            <FormProvider mapper={mappings} propsMapping={formBuilderPropsMapping}>
                <Page schema={schema} />
            </FormProvider>
    )
}

export default Preview