import { Link } from "react-router-dom";

import useNavigation from "../../hooks/useNavigation";

export default function AppBreadcrumb() {

    const { breadcrumb } = useNavigation();

    if (!breadcrumb?.length) {

        return null;

    }

    return (

        <nav
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
        >

            {breadcrumb.map((item, index) => {

                const isLast =
                    index === breadcrumb.length - 1;

                return (

                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >

                        {item.to && !isLast ? (

                            <Link
                                to={item.to}
                                className="hover:text-blue-600"
                            >
                                {item.label}
                            </Link>

                        ) : (

                            <span
                                className={
                                    isLast
                                        ? "font-medium text-slate-700"
                                        : ""
                                }
                            >
                                {item.label}
                            </span>

                        )}

                        {!isLast && (

                            <span>/</span>

                        )}

                    </div>

                );

            })}

        </nav>

    );

}