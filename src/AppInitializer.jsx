import useAuth from "./hooks/useAuth";

import AppLoader from "./components/common/AppLoader";

export default function AppInitializer({

    children,

}) {

    const {

        loading,

    } = useAuth();

    if (loading) {

        return <AppLoader />;

    }

    return children;

}