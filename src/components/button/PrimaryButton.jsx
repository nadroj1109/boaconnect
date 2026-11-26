import Button from "./Button";

export default function PrimaryButton({

    type = "button",

    children = "Submit",

    icon,

    ...props

}) {

    return (

        <Button

            {...props}

            type={type}

            variant="primary"

            icon={icon}

        >

            {children}

        </Button>

    );

}