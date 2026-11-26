import { useState, useRef, useEffect } from "react";

import {
    BellIcon,
} from "@heroicons/react/24/outline";

import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {

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
                    relative
                    rounded-full
                    p-2
                    hover:bg-slate-100
                "
            >

                <BellIcon className="h-6 w-6"/>

                <span
                    className="
                        absolute
                        right-1
                        top-1
                        h-2
                        w-2
                        rounded-full
                        bg-red-500
                    "
                />

            </button>

            {open && <NotificationDropdown />}

        </div>

    );

}