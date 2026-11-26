
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";

export default function ForgotPasswordPage() {

    return (
        <AuthLayout
            heroTitle="Need Help?"
            heroDescription="We'll send you a password reset link."
        >
            
            <AuthCard>

                <AuthHeader
                    title="Activate Account"
                    subtitle="Create your password."
                />
                
                {/* Form */}

            </AuthCard>

        </AuthLayout>


    );

}