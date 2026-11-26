import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";

export default function LoginPage() {

    return (
        <AuthLayout>
            
            <AuthCard>

                <AuthHeader

                    title="Login"

                    subtitle="Sign in to continue."

                />
                
                <LoginForm />

            </AuthCard>

        </AuthLayout>


    );

}