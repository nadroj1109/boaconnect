import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <>
            <AppRoutes />

            <Toaster
                position="top-right"

                containerStyle={{
                    zIndex: 10000,
                }}

                toastOptions={{
                    duration: 4000,

                    style: {
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#1e293b",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                    },

                    success: {
                        iconTheme: {
                            primary: "#166534",
                            secondary: "#fff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#dc2626",
                            secondary: "#fff",
                        },
                    },
                }}
            />
        </>
    );
}