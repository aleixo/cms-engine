import Form from './Form.js';
import { TSchema, TScope } from '../types.js';
declare class Factory {
    workers: Record<string, Form>;
    constructor();
    getFormInstance(namespace?: string, opts?: {
        schema?: TSchema;
        initialScope?: TScope;
        initialValues?: Record<string, any>;
        newInstance?: boolean;
    }): Form;
}
export default Factory;
