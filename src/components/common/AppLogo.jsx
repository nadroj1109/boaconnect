import clsx from "clsx";

export default function AppLogo({

    className,

}) {

    return (

        <img

            src="/boaconnect-logo.png"

            alt="BOAConnect"

            className={clsx(

                "object-contain transition-transform duration-300 hover:scale-105",

                className

            )}

        />

    );

}