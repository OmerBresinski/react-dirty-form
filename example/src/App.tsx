import React, { useEffect } from 'react'
import { useForm, TextInput } from 'react-dirty-form';

const App = () => {

  const { form, setForm, isDirty, isReadyForPost, handleInputChange, handleSubmit } = useForm();

  useEffect(() => {
    isReadyForPost && postFormToServer();
  }, [isReadyForPost]);

  useEffect(() => {
    setForm({ username: { value: 'omer' } });
  }, []);

  const customPasswordValidation = (value: string): boolean => {
    return value.length >= 6
  }

  const postFormToServer = () => {
    console.log("Sending form: ", form);
  }

  return (
    <>
      <TextInput
        minLength={3}
        containerStyle={containerStyle}
        containerErrorStyle={containerErrorStyle}
        labelStyle={labelStyle}
        labelErrorStyle={labelErrorStyle}
        inputStyle={inputStyle}
        inputErrorStyle={inputErrorStyle}
        errorMessageStyle={errorMessageStyle}
        label="Username"
        value={form.username?.value}
        isDirty={isDirty}
        onChange={handleInputChange}
        name="username" />
      <TextInput
        minLength={3}
        containerStyle={containerStyle}
        containerErrorStyle={containerErrorStyle}
        customValidation={{ validator: customPasswordValidation, errorMessage: "Passwords must be atleast 6 characters long." }}
        labelStyle={labelStyle}
        labelErrorStyle={labelErrorStyle}
        inputStyle={inputStyle}
        inputErrorStyle={inputErrorStyle}
        errorMessageStyle={errorMessageStyle}
        isRequired
        isPassword
        label="Password"
        value={form?.password?.value}
        isDirty={isDirty}
        onChange={handleInputChange}
        name="password" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;

const containerStyle = `
  display: flex;
  user-select: none;
  flex-direction: column;
  font-family: 'Roobert TRIAL';
  margin-block-end: 10px;
`;

const containerErrorStyle = `
  color: red;
`;

const labelStyle = `
  font-size: 12px;
  color: gray;
  margin-block-end: 7px;
  transition: color 0.15s ease-in-out;
`;

const labelErrorStyle = `
  color: darkred;
`;

const inputStyle = `
  outline: none;
  border: 1px solid #E8E8E8;
  height: 30px;
  font-size: 12px;
  padding: 7px 7px;
  box-sizing: border-box;
  max-width: 150px;
  width: 100%;
  transition: border 0.15s ease-in-out;
  &:hover {
    border-color: lightgray;
  }
  &:focus {
    border-color: lightgray;
  }
`;

const inputErrorStyle = `
  border: 1px solid red;
  &:hover {
    border-color: red;
  }
  &:focus {
    border-color: red;
  }
`;

const errorMessageStyle = `
  margin-block-start: 7px;
  color: red;
  font-size: 12px;

`;
