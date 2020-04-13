import styled from 'styled-components';

type Props = { customStyle: Style };
type Style = string | undefined;

export const Container = styled.div`
    ${(props: Props) => props.customStyle}
`;

export const LabelText = styled.div`
    ${(props: Props) => props.customStyle}
`;

export const Input = styled.input`
    ${(props: Props) => props.customStyle}
`;

export const ErrorMessage = styled.div`
    ${(props: Props) => props.customStyle}
`;