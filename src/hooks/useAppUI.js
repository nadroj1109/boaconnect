import { useContext } from "react";

import AppUIContext from "../contexts/AppUIContext";

export default function useAppUI() {

    const context = useContext(AppUIContext);

    if (!context) {
        if (import.meta.env.DEV) {
            console.warn("AppUI not ready yet.");
            return {
                routes: [],
                pages: [],
                sidebar: [],
                currentRoute: null,
                breadcrumb: [],
                pageTitle: "",
                subtitle: "",
            };
        }
        throw new Error(
            "useAppUI must be used inside AppUIProvider."
        );
    }

    return context;

}