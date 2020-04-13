import { useState, Dispatch, SetStateAction } from "react";

type FormHook = {
    form: Form,
    setForm: SetForm,
    isDirty: IsDirty,
    isReadyForPost: isReadyForPost,
    handleInputChange: HandleInputChange,
    handleSubmit: HandleSubmit
};

type SetForm = Dispatch<SetStateAction<DirtyForm>>;
type IsDirty = boolean;
type isReadyForPost = boolean;
type HandleInputChange = (value: string, isValid: boolean, fieldName: string) => void;
type HandleSubmit = () => void;
type DirtyForm = { [key: string]: DirtyFormValue } | undefined;
type Form = { [key: string]: FormValue | undefined };
type DirtyFormValue = {
    value: string,
    isValid: boolean
}
type FormValue = {
    value: string
}

const useForm = (): FormHook => {
    const [dirtyForm, setDirtyForm] = useState<DirtyForm>();
    const [isDirty, setIsDirty] = useState(false);
    const [isReadyForPost, setIsReadyForPost] = useState(false);

    const handleInputChange: HandleInputChange = (value: string, isValid: boolean, fieldName: string) => {
        const tempForm = { ...dirtyForm };
        tempForm[fieldName] = { value: value, isValid: isValid };
        setDirtyForm(tempForm);
    }

    const handleSubmit = () => {
        setIsDirty(true);
        const isValid = dirtyForm ? getIsFormValid() : false;
        isValid && setIsReadyForPost(true);
    }

    const getIsFormValid = () => {
        let isValid = true;
        dirtyForm && Object.keys(dirtyForm).forEach(key => {
            isValid = isValid && dirtyForm[key].isValid;
        });
        return isValid;
    }

    const getFormValues = (): Form => {
        const tmpFinalForm = {};
        dirtyForm && Object.keys(dirtyForm).forEach(key => {
            tmpFinalForm[key] = dirtyForm[key].value;
        });
        return tmpFinalForm;
    }

    const form = getFormValues();
    const setForm = setDirtyForm;
    return { form, setForm, isDirty, isReadyForPost, handleInputChange, handleSubmit };
}

export default useForm;