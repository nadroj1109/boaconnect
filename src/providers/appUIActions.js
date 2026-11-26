export const AppUIActions = {

    toggleSidebar(dispatch, current) {

        dispatch({
            type: "SET_SIDEBAR_OPEN",
            payload: !current,
        });

    },

    openSidebar(dispatch) {

        dispatch({
            type: "SET_SIDEBAR_OPEN",
            payload: true,
        });

    },

    closeSidebar(dispatch) {

        dispatch({
            type: "SET_SIDEBAR_OPEN",
            payload: false,
        });

    },

    toggleCollapse(dispatch, current) {

        dispatch({
            type: "SET_SIDEBAR_COLLAPSED",
            payload: !current,
        });

    },

    setIsMobile(dispatch, value) {

        dispatch({
            type: "SET_IS_MOBILE",
            payload: value,
        });

    },

};