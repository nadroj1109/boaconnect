import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function OnboardingRouteGuard({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (user?.onboarding_required) {
        if (location.pathname !== "/onboarding") {
            return <Navigate to="/onboarding" replace />;
        }

        return children;
    }

    // Completed users do not need to revisit onboarding.
    if (location.pathname === "/onboarding") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}