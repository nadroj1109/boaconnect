import { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import {
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

import SidebarItem from "./SidebarItem";

export default function SidebarGroup({
    route
}) {

    const {
        navigation,
        children,
    } = route;

    const Icon = navigation.icon;

    const location = useLocation();

    const hasActiveChild = children.some(child =>
        matchPath(
            {
                path: child.path,
                end: false,
            },
            location.pathname
        )
    );

    const [open, setOpen] = useState(hasActiveChild);

    useEffect(() => {

        if (hasActiveChild) {

            setOpen(true);

        }

    }, [hasActiveChild]);

    return (

        <div className="mb-1">

            {/* Parent */}

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-green-100
                    hover:bg-green-700
                    transition-colors
                "
            >

                <div className="flex items-center gap-3">

                    {Icon && (

                        <Icon className="h-5 w-5"/>

                    )}

                    <span>
                        {navigation.title}
                    </span>

                </div>

                <ChevronDownIcon
                    className={`
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </button>

            {/* Children */}

            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                        open
                            ? "max-h-96"
                            : "max-h-0"
                    }
                `}
            >

                <div className="mt-1 ml-4 border-l border-green-600 pl-2">

                    {children.map(item => (

                        <SidebarItem
                            key={item.id}
                            route={item}
                            nested
                        />

                    ))}

                </div>

            </div>

        </div>

    );

}