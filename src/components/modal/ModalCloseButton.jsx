// import { X } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalCloseButton({

    onClick,

    disabled,

}) {

    return (

        <button

            type="button"

            disabled={disabled}

            onClick={onClick}

            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"

        >

            <XMarkIcon className="h-5 w-5" />

        </button>

    );

}