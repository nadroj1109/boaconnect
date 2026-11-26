import useFormContext from "./useFormContext";

export default function useField(name) {

    const form = useFormContext();

    const value = form.getValue(name);

    const error = form.getError(name);

    function setValue(value) {

        form.setValue(name, value);

    }

    // console.log({
    //     name,
    //     value,
    //     error,
    // });

    if(!name){

        throw new Error(

            "useField(name) requires a valid field name."

        );

    }

    return {
        
        name,

        value,

        error,

        setValue,

        processing: form.processing,

        dirty: form.dirty,

        form,

    };

}