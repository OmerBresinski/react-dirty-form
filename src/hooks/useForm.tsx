import { useState, useCallback } from "react";

type FormHook = {
    form: Form,
    setForm: SetForm,
    isDirty: IsDirty,
    handleInputChange: HandleInputChange,
    handleSubmit: HandleSubmit
};

type SetForm = (form: Form) => void;
type IsDirty = boolean;
type HandleInputChange = (value: string, isValid: boolean, fieldName: string) => void;
type HandleSubmit = () => void;
type PostFormToServer = () => void;
type DirtyForm = { [key: string]: DirtyFormValue };
type Form = { [key: string]: string };
type DirtyFormValue = {
    value: string,
    isValid: boolean
}

const useForm = (postFormToServer: PostFormToServer): FormHook => {
    const [dirtyForm, setDirtyForm] = useState<DirtyForm | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleInputChange: HandleInputChange = useCallback((value: string, isValid: boolean, fieldName: string) => {
        setDirtyForm(f => { return { ...f, [fieldName]: { value: value, isValid: isValid } } });
    }, []);

    const handleSubmit = () => {
        setIsDirty(true);
        const isValid = dirtyForm ? getIsFormValid() : false;
        isValid && postFormToServer();
    }

    const getIsFormValid = () => {
        let isValid: boolean = true;
        dirtyForm && Object.keys(dirtyForm).forEach(key => {
            isValid = isValid && dirtyForm[key].isValid;
        });
        return isValid;
    }

    const getFormValues = (): Form => {
        const tmpForm: Form = {};
        dirtyForm && Object.keys(dirtyForm).forEach(key => {
            tmpForm[key] = dirtyForm[key].value;
        });
        return tmpForm;
    }

    const setForm = (form: Form) => {
        const tmpForm: DirtyForm = {};
        Object.keys(form).forEach(key => {
            tmpForm[key] = { value: form[key] || '', isValid: true };
        });
        setDirtyForm(tmpForm);
    };

    const form = getFormValues();
    return { form, setForm, isDirty, handleInputChange, handleSubmit };
}

export default useForm;