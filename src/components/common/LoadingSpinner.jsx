export default function LoadingSpinner({
    text = null,
    size = "md",
}) {

    const sizes = {
        sm: "h-6 w-6 border-3",
        md: "h-8 w-8 border-4",
        lg: "h-10 w-10 border-4",
    };

    return (

        <div className="flex items-center justify-center">

            <div className="text-center">

                <div
                    className={`
                        mx-auto
                        animate-spin
                        rounded-full
                        border-slate-200
                        border-t-green-600
                        ${sizes[size] ?? sizes.md}
                    `}
                />

                {text && (
                    <p className="mt-3 text-sm text-slate-500">
                        {text}
                    </p>
                )}

            </div>

        </div>

    );

}