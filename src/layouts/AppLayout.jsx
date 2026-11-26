import { Outlet } from "react-router-dom";

import AppSidebar from "../components/layout/AppSidebar";
import AppNavbar from "../components/layout/AppNavbar";
import AppFooter from "../components/layout/AppFooter";

import useAppUI from "../hooks/useAppUI";

export default function AppLayout() {

    const { contentMargin } = useAppUI();

    return (

        <div className="min-h-screen w-full bg-slate-100">

            <AppSidebar />

            <div
                className={`
                    flex
                    min-h-screen
                    flex-col
                    transition-all
                    duration-300
                    ${contentMargin}
                `}
            >

                <AppNavbar />

                <main className="flex-1 p-6">

                    <Outlet />

                </main>

                <AppFooter />

            </div>

        </div>

    );

}