export default function HelpText({

    children,

}) {

    if (!children) {

        return null;

    }

    return (

        <p
            className="
                mt-1
                text-xs
                text-slate-500
            "
        >

            {children}

        </p>

    );

}