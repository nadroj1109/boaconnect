import Button from "./Button";

export default function InfoButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="info"

            icon={icon}

        >

            {children}

        </Button>

    );

}