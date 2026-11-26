import { NavLink } from "react-router-dom";

import useAppUI from "../../hooks/useAppUI";
import { AppUIActions } from "../../providers";

export default function SidebarItem({
    route,
    nested = false,
}) {

    const {
        dispatch,
        state,
    } = useAppUI();

    const { sidebarCollapsed, screen } = state;

    const {
        navigation,
        path,
    } = route;

    const Icon = navigation?.icon;

    function handleClick() {

        // Close sidebar on mobile/tablet only
        if (screen !== "desktop") {

            AppUIActions.closeSidebar(dispatch);

        }

    }

    return (

        <NavLink to={path}>

            {({ isActive }) => (

                <div
                    onClick={handleClick}
                    className={`
                        flex
                        items-center
                        rounded-lg
                        mb-1
                        font-medium
                        transition-all
                        duration-200

                        ${
                            nested
                                ? "px-3 py-2 text-[13px]"
                                : "px-4 py-3 text-sm"
                        }

                        ${
                            sidebarCollapsed
                                ? "justify-center"
                                : "gap-3"
                        }

                        ${
                            isActive
                                ? "bg-green-500 text-white"
                                : "text-green-100 hover:bg-green-700 hover:text-white"
                        }
                    `}
                >

                    {Icon && (

                        <Icon
                            className={`
                                flex-shrink-0
                                ${
                                    nested
                                        ? "h-4 w-4 text-green-100"
                                        : "h-5 w-5"
                                }
                            `}
                        />

                    )}

                    {!sidebarCollapsed && (

                        <span className="truncate">

                            {navigation.title}

                        </span>

                    )}

                </div>

            )}

        </NavLink>

    );

}