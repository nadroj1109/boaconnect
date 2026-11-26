import Button from "./Button";

export default function DefaultButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="light"

            icon={icon}

        >

            {children}

        </Button>

    );

}