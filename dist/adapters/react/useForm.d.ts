import { TChildrenOptions, TFormValues } from './types.js';
declare type TProps = {
    formId?: string;
    onValid?(data: TFormValues): void;
    onData?(data: TFormValues): void;
    onSubmit?(data: TFormValues | {
        data: TFormValues;
    }): void;
};
declare type THookReturn = {
    submitForm(): void;
    formData(opts?: TChildrenOptions): TFormValues;
    configs: {
        formId: string;
    };
};
declare const useForm: ({ onValid, onData, onSubmit, formId }: TProps) => THookReturn;
export default useForm;
