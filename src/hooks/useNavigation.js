import { useContext } from "react";

import NavigationContext from "../contexts/NavigationContext";

export default function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) {
        if (import.meta.env.DEV) {
            console.warn("NavigationProvider not ready yet.");
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
            "useNavigation must be used inside NavigationProvider."
        );
    }

    return context;
}