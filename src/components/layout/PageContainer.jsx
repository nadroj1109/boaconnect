export default function PageContainer({

    children,

    className = "",

}) {

    return (

        <section
            className={`
                w-full
                max-w-full
                space-y-6
                ${className}
            `}
        >

            {children}

        </section>

    );

}