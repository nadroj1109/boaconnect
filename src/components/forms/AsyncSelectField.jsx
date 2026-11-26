import BaseSelect from "./base/BaseSelect";

export default function AsyncSelectField(props){

    return(

        <BaseSelect

            {...props}

            isAsync

        />

    );

}