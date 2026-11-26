export default function ModalFooter({

    children,

    className = "",

}) {

    return (

        <div

            className={`
                flex
                justify-end
                gap-3
                border-t
                px-6
                py-4
                ${className}
            `}

        >

            {children}

        </div>

    );

}