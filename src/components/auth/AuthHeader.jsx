import clsx from "clsx";

export default function AuthHeader({

    title,

    subtitle,

    align = "center",

}) {

    return (

        <div
            className={clsx(

                "mb-8",

                align === "center"

                    ? "text-center"

                    : "text-left"

            )}
        >

            <h2
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-slate-800
                "
            >

                {title}

            </h2>

            {

                subtitle && (

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >

                        {subtitle}

                    </p>

                )

            }

        </div>

    );

}