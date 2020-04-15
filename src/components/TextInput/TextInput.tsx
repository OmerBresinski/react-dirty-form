import React, { useState, useEffect } from 'react';
import { Container, LabelText, Input, ErrorMessage } from './style';

type Props = {
    name: string,
    form: Form,
    isDirty: boolean,
    onChange: OnChangeFunction,
    label?: string,
    inputStyle?: string,
    labelStyle?: string,
    containerStyle?: string,
    inputErrorStyle?: string,
    labelErrorStyle?: string,
    errorMessageStyle?: string,
    containerErrorStyle?: string,
    minLength?: number,
    maxLength?: number,
    isRequired?: boolean,
    isPassword?: boolean,
    customValidation?: CustomValidation
}
type Form = { [key: string]: string };
type OnChangeFunction = (value: string, isValid: boolean, fieldName: string) => void;
type CustomValidation = { validator: (value: string) => boolean, errorMessage: string };

const TextInput: React.FC<Props> = (props: Props) => {

    const [isValid, setIsValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const shouldShowError = !isValid && props.isDirty;

    useEffect(() => {
        props.onChange(props.form[props.name], validate(props.form[props.name] ?? ''), props.name);
    }, [props.form[props.name]]);


    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        props.onChange(inputValue, validate(inputValue), props.name);
    }

    const validate = (inputValue: string): boolean => {
        let tmpIsValid = false;
        let errorCause = '';
        let isRequiredValid = inputValue.length > 0;
        let isMinLengthValid = props.minLength ? inputValue.length >= props.minLength : true;
        let isMaxLengthValid = props.maxLength ? inputValue.length < props.maxLength : true;
        let isCustomValid = props.customValidation ? props.customValidation.validator(inputValue) : true;
        errorCause = getErrorCause(isRequiredValid, isMinLengthValid, isMaxLengthValid, isCustomValid);
        errorCause && setErrorMessage(ERROR_MESSAGES[errorCause]);
        tmpIsValid = errorCause ? false : true;
        setIsValid(tmpIsValid);
        return tmpIsValid;
    }

    const getErrorCause = (isRequiredValid: boolean, isMinLengthValid: boolean, isMaxLengthValid: boolean, isCustomValid: boolean): string => {
        let errorCause = '';
        !isCustomValid && (errorCause = ERROR_CAUSES.custom);
        !isMinLengthValid && (errorCause = ERROR_CAUSES.minLength);
        !isMaxLengthValid && (errorCause = ERROR_CAUSES.maxLength);
        !isRequiredValid && (errorCause = ERROR_CAUSES.isRequired);
        return errorCause;
    }

    const getContainerStyle = (): string => {
        const containerStyle = props.containerStyle || '';
        const containerErrorStyle = props.containerErrorStyle || '';
        return shouldShowError ? containerStyle + containerErrorStyle : containerStyle
    }

    const getLabelStyle = (): string => {
        const labelStyle = props.labelStyle || '';
        const labelErrorStyle = props.labelErrorStyle || '';
        return shouldShowError ? labelStyle + labelErrorStyle : labelStyle
    }

    const getInputStyle = (): string => {
        const inputStyle = props.inputStyle || '';
        const inputErrorStyle = props.inputErrorStyle || '';
        return shouldShowError ? inputStyle + inputErrorStyle : inputStyle
    }

    const ERROR_MESSAGES = {
        isRequired: `Required Field`,
        minLength: `Must be at least ${props.minLength} characters long`,
        maxLength: `Must be shorter than ${props.maxLength} characters`,
        custom: props.customValidation?.errorMessage
    };

    return (
        <Container customStyle={getContainerStyle()}>
            {props.label && <LabelText customStyle={getLabelStyle()}>{props.label}</LabelText>}
            <Input type={props.isPassword ? INPUT_TYPE.password : INPUT_TYPE.text} customStyle={getInputStyle()} value={props.form[props.name]} onChange={handleChange} />
            {shouldShowError && <ErrorMessage customStyle={props.errorMessageStyle}>{errorMessage}</ErrorMessage>}
        </Container>
    );
}

const INPUT_TYPE = {
    text: 'text',
    password: 'password'
}

const ERROR_CAUSES = {
    isRequired: 'isRequired',
    minLength: 'minLength',
    maxLength: 'maxLength',
    custom: 'custom'
}

export default React.memo(TextInput);