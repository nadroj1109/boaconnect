import TextField from "./TextField";

export default function DateTimeField({

    ...props

}) {

    return (

        <TextField
        
            type="datetime-local"
        
            {...props}

        />

    );

}