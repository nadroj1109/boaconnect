import {
    createContext,
    useMemo,
    useReducer,
    useEffect
} from "react";

import AppUIContext from "../contexts/AppUIContext";

const initialState = {
    sidebarOpen: true,
    sidebarCollapsed: false,
    screen: "desktop",
    theme: "light",
    loading: false,
};

function reducer(state, action) {

    switch (action.type) {

        case "SET_SIDEBAR_OPEN":

            return {

                ...state,

                sidebarOpen: action.payload,

            };

        case "SET_SIDEBAR_COLLAPSED":

            return {

                ...state,

                sidebarCollapsed: action.payload,

            };

        case "SET_SCREEN":

            return {

                ...state,

                screen: action.payload,

            };

        default:

            return state;

    }

}

function getScreen() {

    const width = window.innerWidth;

    if (width < 768)
        return "mobile";

    if (width < 1280)
        return "tablet";

    return "desktop";

}

export default function AppUIProvider({ children }) {

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {

        const handleResize = () => {

        const screen = getScreen();

            dispatch({
                type: "SET_SCREEN",
                payload: screen,
            });

            dispatch({
                type: "SET_SIDEBAR_OPEN",
                payload: screen !== "mobile",
            });

        };

        handleResize();

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    const isMobile = state.screen === "mobile";

    const isTablet = state.screen === "tablet";

    const isDesktop = state.screen === "desktop";

    const contentMargin = isMobile
        ? "ml-0"
        : state.sidebarCollapsed
            ? "lg:ml-[72px]"
            : "lg:ml-[260px]";

    const value = useMemo(
        () => ({
            state,
            dispatch,
            isMobile,
            isTablet,
            isDesktop,
            contentMargin,
        }), [
            state,
            dispatch,
            isMobile,
            isTablet,
            isDesktop,
            contentMargin,
        ]
    );

    return (
        <AppUIContext.Provider value={value}>
            {children}
        </AppUIContext.Provider>
    );
}