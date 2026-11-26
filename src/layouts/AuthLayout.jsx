import AppLogo from "../components/common/AppLogo";

export default function AuthLayout({

    heroTitle = "BOAConnect",

    heroDescription = "An Integrated Citizen Request and Barangay Service Management System.",

    children,

}) {

    return (

        <div className="min-h-screen bg-slate-100 lg:flex">

            {/* Left Side */}

            <div
                className="
                    hidden
                    lg:flex
                    w-1/2
                    bg-forest-green
                    text-white
                    items-center
                    justify-center
                    p-16
                "
            >

                <div className="max-w-md text-center">

                    <AppLogo
                        className="
                            mx-auto
                            mb-8
                            h-36
                            w-36
                        "
                    />

                    <h1
                        className="
                            text-5xl
                            font-bold
                            tracking-tight
                        "
                    >

                        {heroTitle}

                    </h1>

                    <p
                        className="
                            mt-8
                            text-lg
                            leading-8
                            text-green-100
                        "
                    >

                        {heroDescription}

                    </p>

                </div>

            </div>

            {/* Right Side */}

            <div
                className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    px-6
                    py-10
                    lg:px-12
                "
            >

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <div
                        className="
                            mb-10
                            text-center
                            lg:hidden
                        "
                    >

                        <AppLogo
                            className="
                                mx-auto
                                mb-4
                                h-20
                                w-20
                            "
                        />

                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-forest-green
                            "
                        >

                            BOAConnect

                        </h1>

                    </div>

                    {children}

                </div>

            </div>

        </div>

    );

}