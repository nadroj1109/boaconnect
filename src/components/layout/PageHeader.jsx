import useNavigation from "../../hooks/useNavigation";

import AppBreadcrumb from "./AppBreadcrumb";

export default function PageHeader({

    actions,

}) {

    const {

        pageTitle,

        subtitle,

    } = useNavigation();

    return (

        <div className="flex flex-col gap-4 border-slate-200 lg:flex-row lg:items-center lg:justify-between">

            <div>

                <h1 className="text-2xl font-bold text-slate-800">

                    {pageTitle}

                </h1>

                {subtitle && (

                    <p className="mt-1 text-sm text-slate-500">

                        {subtitle}

                    </p>

                )}

            </div>

            {actions && (

                <div className="flex items-center gap-2">

                    {actions}

                </div>

            )}

            <AppBreadcrumb />

        </div>

    );

}