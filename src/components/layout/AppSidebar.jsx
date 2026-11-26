import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

import useAppUI from "../../hooks/useAppUI";
import useNavigation from "../../hooks/useNavigation";
import { AppUIActions } from "../../providers";
import { THEME } from "../../config/theme";
import AppLogo from "../common/AppLogo";

export default function AppSidebar() {

    const { sidebar } = useNavigation();
    // console.log(sidebar);

    const { state, dispatch } = useAppUI();

    const {
        sidebarOpen,
        sidebarCollapsed,
        screen,
    } = state;

    useEffect(() => {

        if (screen === "mobile") {

            document.body.style.overflow =
                sidebarOpen ? "hidden" : "";

        }

        return () => {

            document.body.style.overflow = "";

        };

    }, [
        sidebarOpen,
        screen,
    ]);

    return (
        <>
            {/* Mobile Overlay */}
            {screen === "mobile" && sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={() =>
                        AppUIActions.closeSidebar(dispatch)
                    }
                />
            )}

            <aside
                className={`
                    fixed
                    top-0
                    left-0
                    z-[60]
                    h-screen
                    bg-forest-green
                    text-white
                    shadow-xl
                    transition-transform
                    duration-300
                    overflow-hidden
                    ease-in-out
                    ${
                        screen === "mobile"
                            ? sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                            : "translate-x-0"
                    }
                `}

                style={{
                    width: sidebarCollapsed
                        ? THEME.sidebar.collapsedWidth
                        : THEME.sidebar.expandedWidth,
                }}
            >
                {/* Header */}

                <div className="flex h-16 items-center justify-between border-b border-green-600 px-5">

                    {!sidebarCollapsed && (
                        <div className="flex items-center gap-3">
                            <AppLogo className="h-10 w-10 flex-shrink-0" />

                            <h1 className="text-xl font-bold tracking-wide text-white">
                                BOAConnect
                            </h1>

                            {/* <p className="mt-1 text-xs text-green-200">

                                Barangay Information System

                            </p> */}

                        </div>
                    )}

                    {screen === "mobile" && (
                        <button
                            variant="text"
                            color="white"
                            onClick={() =>
                                AppUIActions.closeSidebar(dispatch)
                            }
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}

                </div>

                {/* Navigation */}

                <div className="h-[calc(100vh-64px)] overflow-y-auto p-3">

                    <nav className="space-y-1">

                        {sidebar.map(route => {
                            // console.log(route);
                            return route.type === "group" ? (

                                <SidebarGroup
                                    key={route.id}
                                    route={route}
                                />

                            ) : (

                                <SidebarItem
                                    key={route.id}
                                    route={route}
                                />

                            );

                        })}

                    </nav>

                </div>

            </aside>
        </>
    );

}