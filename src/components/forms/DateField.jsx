import TextField from "./TextField";

export default function DateField({

    max,

    ...props

}) {

    return (

        <TextField

            type="date"

            max={
                max ??
                new Date().toISOString().split("T")[0]
            }

            {...props}

        />

    );

}