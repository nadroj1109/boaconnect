import { useNavigate } from "react-router-dom";

import {
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function UserDropdown() {

    const navigate = useNavigate();

    const { actions } = useAuth();

    async function handleLogout(e) {
        e.preventDefault();

        await actions.logout();

        navigate("/login", {
            replace: true,
        });
    }

    return (

        <div
            className="
                absolute
                right-0
                mt-2
                w-56
                overflow-hidden
                rounded-lg
                border
                bg-white
                shadow-xl
            "
        >

            <Link
                to="/profile"
                className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-slate-50
                "
            >

                <UserCircleIcon className="h-5 w-5"/>

                My Profile

            </Link>

            <Link
                to="/settings"
                className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-slate-50
                "
            >

                <Cog6ToothIcon className="h-5 w-5"/>

                Settings

            </Link>

            <hr />

            <button
                onClick={handleLogout}
                className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-red-600
                    hover:bg-red-50
                "
            >

                <ArrowRightOnRectangleIcon className="h-5 w-5"/>

                Logout

            </button>

        </div>

    );

}