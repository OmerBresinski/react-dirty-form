# react-dirty-form

> A form input component library

[![NPM](https://img.shields.io/npm/v/react-dirty-form.svg)](https://www.npmjs.com/package/react-dirty-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-dirty-form
```

## Usage

```tsx
import React, { useEffect } from 'react'
import { useForm, TextInput } from 'react-dirty-form';

const App = () => {

  const { form, isDirty, isReadyForPost, handleInputChange, handleSubmit } = useForm();

  useEffect(() => {
    isReadyForPost && postFormToServer();
  }, [isReadyForPost]);

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
        isRequired
        label="Username"
        value={form?.username?.value}
        isDirty={isDirty}
        onChange={handleInputChange}
        name="username" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

## License

MIT © [omerbresinski](https://github.com/omerbresinski)
