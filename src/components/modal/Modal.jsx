import { useEffect } from "react";
import { createPortal } from "react-dom";

const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
};

export default function Modal({

    open,

    onClose,

    children,

    size = "md",

    loading = false,

    closeOnEscape = true,

    closeOnBackdrop = true,

}) {

    useEffect(() => {

        if (!open) return;

        function handleKeyDown(e) {

            if (

                e.key === "Escape" &&

                closeOnEscape &&

                !loading

            ) {

                onClose?.();

            }

        }

        document.addEventListener("keydown", handleKeyDown);

        const overflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {

            document.removeEventListener("keydown", handleKeyDown);

            document.body.style.overflow = overflow;

        };

    }, [

        open,

        loading,

        closeOnEscape,

        onClose,

    ]);

    if (!open) {

        return null;

    }

    return createPortal(

        <div
            className="
                fixed
                inset-0
                z-[9000]
                flex
                items-center
                justify-center
                p-6
            "
        >

            <div

                onClick={() => {

                    if (

                        closeOnBackdrop &&

                        !loading

                    ) {

                        onClose?.();

                    }

                }}

                className="
                    absolute
                    inset-0
                    bg-black/50
                    backdrop-blur-sm
                "

            />

            <div

                className={`
                    relative
                    w-full
                    ${sizes[size]}
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-2xl
                `}

                onClick={(e) => e.stopPropagation()}

            >

                {children}

            </div>

        </div>,

        document.body

    );

}