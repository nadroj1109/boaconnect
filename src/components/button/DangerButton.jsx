import Button from "./Button";

export default function DangerButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="danger"

            icon={icon}

        >

            {children}

        </Button>

    );

}