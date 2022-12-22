import React from 'react';

export function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues);

    return {
        values,
        handleChange: (e) => {
            const { value, name } = e.target;

            setValues({
                ...values,
                [name]: value
            });
        },
        clearForm: () => setValues(props.initialValues)
    };
}