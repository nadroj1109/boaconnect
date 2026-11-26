import Button from "./Button";

export default function SecondaryButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="secondary"

            icon={icon}

        >

            {children}

        </Button>

    );

}