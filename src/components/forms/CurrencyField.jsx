import NumberField from "./NumberField";

export default function CurrencyField(props){

    return(

        <NumberField

            {...props}

            prefix="₱ "

            decimalScale={2}

        />

    );

}