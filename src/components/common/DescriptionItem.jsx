export default function DescriptionItem({

    label,

    value,

    className = "",

}) {

    return (

        <div className={className}>

            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                {label}

            </div>

            <div className="min-h-6 text-sm text-slate-800">

                {

                    value ||

                    <span className="italic text-slate-400">

                        —

                    </span>

                }

            </div>

        </div>

    );

}