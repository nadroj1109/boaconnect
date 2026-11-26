import Button from "./Button";

export default function WarningButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="warning"

            icon={icon}

        >

            {children}

        </Button>

    );

}