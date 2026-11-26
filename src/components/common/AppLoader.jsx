import AppLogo from "./AppLogo";

export default function AppLoader() {

    return (

        <div className="flex h-screen items-center justify-center bg-slate-100">

            <div className="text-center">

                <AppLogo className="mx-auto mb-6 h-24 w-24" />

                <h2 className="mt-6 text-2xl font-bold text-slate-800">

                    BOAConnect

                </h2>

                <div
                    className="
                        mt-2
                        mx-auto
                        h-12
                        w-12
                        animate-spin
                        rounded-full
                        border-4
                        border-green-700
                        border-t-transparent
                    "
                />

                <p className="mt-2 text-sm text-slate-500">

                    Loading application...

                </p>

            </div>

        </div>

    );

}