import { useState } from "react";

export default function useModal(initial = false) {

    const [open, setOpen] = useState(initial);

    function show() {

        setOpen(true);

    }

    function hide() {

        setOpen(false);

    }

    function toggle() {

        setOpen(prev => !prev);

    }

    return {

        open,

        show,

        hide,

        toggle,

    };

}