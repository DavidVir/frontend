import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formvalues, setformValues] = useState(initialState);

    const reset= () => {
        setformValues({});
    }

    const handleInputChange=({ target }) => {
        setformValues({
            ...formvalues,
            [ target.name ]: target.value
        });
    }

    return [ formvalues , handleInputChange, reset];
    
}
