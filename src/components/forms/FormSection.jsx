// FormSection.jsx
import clsx from "clsx";

export default function FormSection({

    title,

    description,

    children,

    className,

}) {

    return (

        <section className={clsx("space-y-5", className)}>

            <div>

                <h3

                    className="text-lg font-semibold"

                >

                    {title}

                </h3>

                {

                    description && (

                        <p

                            className="text-sm text-slate-500"

                        >

                            {description}

                        </p>

                    )

                }

            </div>

            {children}

        </section>

    );

}