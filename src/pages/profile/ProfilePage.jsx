import {
    useEffect,
    useState,
} from "react";

import {
    DocumentCheckIcon,
    UserCircleIcon,
    LockClosedIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

import useForm from "../../hooks/useForm";

import Can from "../../components/auth/Can";
import FormProvider from "../../components/forms/FormProvider";

import ProfileForm from "../../components/profile/ProfileForm";
import PasswordForm from "../../components/profile/PasswordForm";
import SignatureForm from "../../components/profile/SignatureForm";

import profileService from "../../services/profileService";
import signingCertificateService from "../../services/signingCertificateService";

import { notify } from "../../notifications/notifier";

export default function ProfilePage() {

    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [signaturePreview, setSignaturePreview] =
        useState(null);

    const [certificates, setCertificates] = useState([]);

    const [certificateLoading, setCertificateLoading] = useState(false);

    const [certificateUploading, setCertificateUploading] = useState(false);

    const profileForm = useForm({

        defaultValues: {

            name: "",
            email: "",

        },

    });

    const passwordForm = useForm({

        defaultValues: {

            current_password: "",
            password: "",
            password_confirmation: "",

        },

    });

    const signatureForm = useForm({

        defaultValues: {

            signature: null,

        },

    });

    useEffect(() => {

        loadProfile();

        return () => {

            if (signaturePreview) {

                URL.revokeObjectURL(
                    signaturePreview
                );

            }

        };

    }, []);

    async function loadProfile() {

        setLoading(true);

        try {

            const response =
                await profileService.show();

            const data =
                response.data.data;

            setProfile(data);

            profileForm.initialize({

                name: data.name ?? "",
                email: data.email ?? "",

            });

            if (data.has_signature) {

                await loadSignature();

            }

            await loadCertificates();

        }
        catch (error) {

            notify.error(
                error?.response?.data?.message ??
                "Unable to load profile."
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function loadSignature() {

        try {

            const response =
                await profileService.getSignature();

            const url =
                URL.createObjectURL(
                    response.data
                );

            setSignaturePreview(
                previous => {

                    if (previous) {

                        URL.revokeObjectURL(
                            previous
                        );

                    }

                    return url;

                }
            );

        }
        catch {

            setSignaturePreview(null);

        }

    }

    async function updateProfile() {

        await notify.update({

            promise: profileForm.submit(
                values =>
                    profileService.update({
                        email: values.email,
                    })
            ),

            entity: "Profile",

            onSuccess: response => {

                const data =
                    response.data.data;

                setProfile(data);

                profileForm.initialize({

                    name: data.name ?? "",
                    email: data.email ?? "",

                });

            },

        });

    }

    async function updatePassword() {

        await notify.update({

            promise: passwordForm.submit(
                values =>
                    profileService.updatePassword(
                        values
                    )
            ),

            entity: "Password",

            onSuccess: () => {

                passwordForm.replace({

                    current_password: "",
                    password: "",
                    password_confirmation: "",

                }, true);

            },

        });

    }

    async function updateSignature() {

        const file =
            signatureForm.getValue(
                "signature"
            );

        if (!file) {

            return;

        }

        await notify.update({

            promise: signatureForm.submit(
                () =>
                    profileService.updateSignature(
                        file
                    )
            ),

            entity: "Signature",

            onSuccess: async () => {

                signatureForm.replace({

                    signature: null,

                }, true);

                await loadSignature();

            },

        });

    }

    async function loadCertificates() {

        setCertificateLoading(true);

        try {

            const response =
                await signingCertificateService.index();

            setCertificates(
                response.data.data ?? []
            );

        }
        catch (error) {

            notify.error(
                error?.response?.data?.message ??
                "Unable to load signing certificates."
            );

        }
        finally {

            setCertificateLoading(false);

        }

    }

    async function uploadCertificate(file) {

        if (!file) {
            return;
        }

        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        if (!["cer", "crt"].includes(extension)) {

            notify.error(
                "Please select a .CER or .CRT certificate file."
            );

            return;

        }

        setCertificateUploading(true);

        try {

            await notify.update({

                promise: signingCertificateService.store(file),

                entity: "PNPKI Certificate",

                onSuccess: async () => {

                    await loadCertificates();

                },

            });

        }
        finally {

            setCertificateUploading(false);

        }

    }

    if (loading) {

        return (

            <div className="flex min-h-64 items-center justify-center">

                <div className="text-sm text-gray-500">
                    Loading profile...
                </div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-2xl font-semibold text-gray-900">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your account information, password, and digital signature.
                </p>

            </div>

            <div className="space-y-8">

                <section className="rounded-xl bg-white p-6 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <UserCircleIcon className="h-6 w-6 text-gray-500" />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Personal Information
                            </h2>

                            <p className="text-sm text-gray-500">
                                Update your account email address.
                            </p>

                        </div>

                    </div>

                    <FormProvider form={profileForm}>

                        <ProfileForm
                            loading={profileForm.processing}
                            onSubmit={updateProfile}
                        />

                    </FormProvider>

                </section>

                <section className="rounded-xl bg-white p-6 shadow">

                    <div className="mb-6 flex items-center gap-3">

                        <LockClosedIcon className="h-6 w-6 text-gray-500" />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Password
                            </h2>

                            <p className="text-sm text-gray-500">
                                Change your account password.
                            </p>

                        </div>

                    </div>

                    <FormProvider form={passwordForm}>

                        <PasswordForm
                            loading={passwordForm.processing}
                            onSubmit={updatePassword}
                        />

                    </FormProvider>

                </section>

                <Can permission="document_requests.sign">

                    <section className="rounded-xl bg-white p-6 shadow">

                        <div className="mb-6 flex items-center gap-3">

                            <PencilSquareIcon className="h-6 w-6 text-gray-500" />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Digital Signature
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Upload the signature used when signing official documents.
                                </p>

                            </div>

                        </div>

                        <FormProvider form={signatureForm}>

                            <SignatureForm
                                loading={
                                    signatureForm.processing
                                }
                                preview={
                                    signaturePreview
                                }
                                onSubmit={
                                    updateSignature
                                }
                            />

                        </FormProvider>

                    </section>

                </Can>

                <Can permission="document_requests.sign">

                    <section className="rounded-xl bg-white p-6 shadow">

                        <div className="mb-6 flex items-center gap-3">

                            <DocumentCheckIcon className="h-6 w-6 text-gray-500" />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    PNPKI Digital Certificate
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Register and manage your public digital signing certificate.
                                </p>

                            </div>

                        </div>

                        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">

                            <p className="text-sm text-blue-800">
                                Upload your PNPKI public certificate in .CER or .CRT format.
                                Your private key (.P12 or .PFX) must never be uploaded.
                            </p>

                        </div>

                        <div className="mb-6">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Upload Public Certificate
                            </label>

                            <input
                                type="file"
                                accept=".cer,.crt"
                                disabled={certificateUploading}
                                onChange={event => {

                                    const file = event.target.files?.[0];

                                    uploadCertificate(file);

                                    event.target.value = "";

                                }}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                            />

                            {certificateUploading && (

                                <p className="mt-2 text-sm text-gray-500">
                                    Uploading certificate...
                                </p>

                            )}

                        </div>

                        <div className="border-t border-gray-200 pt-5">

                            <h3 className="mb-4 text-sm font-semibold text-gray-900">
                                Registered Certificates
                            </h3>

                            {certificateLoading ? (

                                <p className="text-sm text-gray-500">
                                    Loading certificates...
                                </p>

                            ) : certificates.length === 0 ? (

                                <p className="text-sm text-gray-500">
                                    No signing certificates registered yet.
                                </p>

                            ) : (

                                <div className="space-y-4">

                                    {certificates.map(certificate => (

                                        <div
                                            key={certificate.id}
                                            className="rounded-lg border border-gray-200 p-4"
                                        >

                                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                                                <span className="text-sm font-semibold text-gray-900">
                                                    {certificate.subject_dn}
                                                </span>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        certificate.status === "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : certificate.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : certificate.status === "rejected"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {certificate.status?.toUpperCase()}
                                                </span>

                                            </div>

                                            <div className="space-y-2 text-sm text-gray-600">

                                                <p>
                                                    <span className="font-medium">
                                                        Issuer:
                                                    </span>{" "}
                                                    {certificate.issuer_dn}
                                                </p>

                                                <p>
                                                    <span className="font-medium">
                                                        Serial Number:
                                                    </span>{" "}
                                                    {certificate.serial_number}
                                                </p>

                                                <p className="break-all">
                                                    <span className="font-medium">
                                                        SHA-256 Fingerprint:
                                                    </span>{" "}
                                                    {certificate.fingerprint_sha256}
                                                </p>

                                                <p>
                                                    <span className="font-medium">
                                                        Valid From:
                                                    </span>{" "}
                                                    {certificate.valid_from}
                                                </p>

                                                <p>
                                                    <span className="font-medium">
                                                        Valid Until:
                                                    </span>{" "}
                                                    {certificate.valid_until}
                                                </p>

                                                {certificate.rejection_reason && (

                                                    <p className="text-red-600">
                                                        <span className="font-medium">
                                                            Rejection Reason:
                                                        </span>{" "}
                                                        {certificate.rejection_reason}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </section>

                </Can>

            </div>

        </div>

    );

}