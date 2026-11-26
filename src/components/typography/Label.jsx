import RequiredMark from "./RequiredMark";

export default function Label({

    htmlFor,

    label,

    required = false,

}) {

    if (!label) {

        return null;

    }

    return (

        <label

            htmlFor={htmlFor}

            className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
            "

        >

            {label}

            {

                required &&

                <RequiredMark />

            }

        </label>

    );

}