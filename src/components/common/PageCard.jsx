import LoadingSpinner from "./LoadingSpinner";

export default function PageCard({
    children,

    title = null,

    loading = false,

    loadingText = "Please wait...",
    loadingSize = "md",

    className = "",
}) {

    return (

        <div
            className={`
                relative
                rounded-xl
                bg-white
                p-6
                shadow-sm
                ${className}
            `}
        >

            {loading && (

                <div
                    className="
                        absolute
                        inset-0
                        z-10
                        flex
                        items-start
                        justify-center
                        rounded-xl
                        bg-white/70
                        pt-16
                        backdrop-blur-[2px]
                    "
                >

                    <LoadingSpinner
                        size={loadingSize}
                        text={loadingText}
                    />

                </div>

            )}


            <div
                className={
                    loading
                        ? "pointer-events-none opacity-50"
                        : ""
                }
            >

                {title && (

                    <div className="mb-5">

                        <h2 className="text-lg font-semibold text-slate-800">

                            {title}

                        </h2>

                    </div>

                )}


                {children}

            </div>

        </div>

    );

}