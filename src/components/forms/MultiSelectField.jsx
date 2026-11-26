import BaseSelect from "./base/BaseSelect";

export default function MultiSelectField(props){

    return(

        <BaseSelect

            {...props}

            isMulti

        />

    );

}