import React, { useState, useEffect } from 'react';
import { Container, LabelText, Input, ErrorMessage } from './style';

type Props = {
    name: Name,
    value: Value,
    isDirty: IsDirty,
    onChange: OnChangeFunction,
    label?: Label,
    inputStyle?: Style,
    labelStyle?: Style,
    containerStyle?: Style,
    inputErrorStyle?: Style,
    labelErrorStyle?: Style,
    errorMessageStyle?: Style,
    containerErrorStyle?: Style,
    minLength?: MinLength,
    isRequired?: IsRequired,
    isPassword?: IsPassword,
    customValidation?: CustomValidation
}

type Value = string | undefined;
type IsDirty = boolean;
type IsRequired = boolean;
type IsPassword = boolean;
type MinLength = number;
type OnChangeFunction = (value: string, isValid: boolean, fieldName: string) => void;
type Name = string;
type Label = string;
type IsValid = boolean;
type Style = string | undefined;
type ErrorMessage = string;
type CustomValidation = { validator: (value: string) => boolean, errorMessage: string };

const TextInput: React.FC<Props> = (props: Props) => {

    const [isValid, setIsValid] = useState<IsValid>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

    useEffect(() => {
        validate(props.value || '');
    }, []);

    const shouldShowError = !isValid && props.isDirty;

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        props.onChange(inputValue, validate(inputValue), props.name);
    }

    const validate = (inputValue: string): boolean => {
        let tmpIsValid = false;
        let errorCause = '';
        let isRequiredValid = inputValue.length > 0;
        let isMinLengthValid = inputValue.length >= (props.minLength || 0);
        let isCustomValid = props.customValidation ? props.customValidation.validator(inputValue) : true;
        errorCause = getErrorCause(isRequiredValid, isMinLengthValid, isCustomValid);
        errorCause && setErrorMessage(ERROR_MESSAGES[errorCause]);
        tmpIsValid = errorCause ? false : true;
        setIsValid(tmpIsValid);
        return tmpIsValid;
    }

    const getErrorCause = (isRequiredValid: boolean, isMinLengthValid: boolean, isCustomValid: boolean): string => {
        let errorCause = '';
        !isCustomValid && (errorCause = ERROR_CAUSES.custom);
        !isMinLengthValid && (errorCause = ERROR_CAUSES.minLength);
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
        custom: props.customValidation?.errorMessage
    };

    return (
        <Container customStyle={getContainerStyle()}>
            <LabelText customStyle={getLabelStyle()}>{props.label}</LabelText>
            <Input type={props.isPassword ? INPUT_TYPE.password : INPUT_TYPE.text} customStyle={getInputStyle()} value={props.value} onChange={handleChange} />
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
    custom: 'custom'
}

export default TextInput;