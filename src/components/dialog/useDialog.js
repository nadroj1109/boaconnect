import { useContext } from "react";

import DialogContext from "../../contexts/DialogContext";

export default function useDialog() {

    const context = useContext(DialogContext);

    if (!context) {

        throw new Error(
            "useDialog must be used inside DialogProvider."
        );

    }

    return context;

}