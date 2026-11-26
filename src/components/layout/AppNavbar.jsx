import { Bars3Icon } from "@heroicons/react/24/outline";

import useNavigation from "../../hooks/useNavigation";
import useAppUI from "../../hooks/useAppUI";
import { AppUIActions } from "../../providers";
import useAuth from "../../hooks/useAuth";

import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export default function AppNavbar() {

    const { pageTitle } = useNavigation();

    const { dispatch } = useAppUI();

    const { user } = useAuth();

    return (

        <header
            className="
                sticky
                top-0
                z-30
                flex
                h-16
                items-center
                justify-between
                border-b
                bg-white
                px-6
            "
        >

            <div className="flex items-center gap-4">

                <button
                    onClick={() =>
                        AppUIActions.toggleSidebar(dispatch)
                    }
                >
                    <Bars3Icon className="h-6 w-6"/>
                </button>

                <h1 className="text-lg font-semibold">
                    {user?.barangay_name ? 'Barangay ' + user?.barangay_name : 'Administration'}
                    {/* pageTitle */}
                </h1>

            </div>

            <div className="flex items-center gap-3">

                <NotificationBell />

                <UserMenu />

            </div>

        </header>

    );

}