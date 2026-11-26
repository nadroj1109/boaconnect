import { useState, useRef, useEffect } from "react";

import UserDropdown from "./UserDropdown";

import useAuth from "../../hooks/useAuth";

export default function UserMenu() {

    const { user } = useAuth();
    // console.log(user);

    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {

        function handleClick(e) {

            if (!ref.current?.contains(e.target)) {

                setOpen(false);

            }

        }

        document.addEventListener("mousedown", handleClick);

        return () =>
            document.removeEventListener("mousedown", handleClick);

    }, []);

    return (

        <div
            ref={ref}
            className="relative"
        >

            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-2
                    py-1
                    hover:bg-slate-100
                "
            >

                <img
                    src={
                        user?.avatar ?? "default-avatar.png"
                    }
                    className="h-10 w-10 rounded-full"
                />

                <div className="text-left">

                    <p className="text-sm font-semibold">

                        {user?.name ?? "Administrator"}

                    </p>

                    <p className="text-xs text-slate-500">

                        {user?.role ?? "System Administrator"}

                    </p>

                </div>

            </button>

            {open && <UserDropdown />}

        </div>

    );

}