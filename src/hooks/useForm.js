import { useState } from 'react'

export const useForm = (initial = {}) => {
    const [values, setValues] = useState(initial);
    const reset = () => {
        setValues(initial)
    }
    const handlerInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handlerInputChange, reset]
}