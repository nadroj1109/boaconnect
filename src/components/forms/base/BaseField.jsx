import useField from "../../../hooks/useField";

export default function BaseField({

    name,

    children,

}) {

    if (!name) {

        throw new Error(

            "BaseField requires a 'name' prop."

        );

    }

    const field = useField(name);

    return children(field);

}