import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalHeader({

    title,

    subtitle,

    onClose,

    loading,

}) {

    return (

        <div
            className="
                flex
                items-start
                justify-between
                border-b
                px-6
                py-5
            "
        >

            <div>

                <h2 className="text-xl font-semibold">

                    {title}

                </h2>

                {

                    subtitle && (

                        <p className="mt-1 text-sm text-slate-500">

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {

                onClose && (

                    <button

                        type="button"

                        disabled={loading}

                        onClick={onClose}

                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-100
                            disabled:opacity-50
                        "

                    >

                        <XMarkIcon className="h-5 w-5"/>

                    </button>

                )

            }

        </div>

    );

}