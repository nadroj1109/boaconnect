export default function AuthCard({

    children,

}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-xl
            "
        >

            {children}

        </div>

    );

}