import BaseInput from "./base/BaseInput";

export default function TextField({type = "text", ...props}) {

    return (

        <BaseInput

            type={type}

            {...props}

        />

    );

}