import FormContext from "../../contexts/FormContext";

export default function FormProvider({

    form,

    children,

}) {

    if (!form) {

        throw new Error(

            "FormProvider requires a form instance from useForm()."

        );

    }

    return (

        <FormContext.Provider value={form}>

            {children}

        </FormContext.Provider>

    );

}