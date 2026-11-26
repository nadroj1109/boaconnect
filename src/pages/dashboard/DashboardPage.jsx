import { useMemo, useState, useEffect, useRef } from "react";

import {
    UserGroupIcon,
    HomeIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    CheckCircleIcon,
    CreditCardIcon,
    ClipboardDocumentCheckIcon,
    PencilSquareIcon
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import DashboardCard from "../../components/common/DashboardCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import useAuth from "../../hooks/useAuth";
import useDashboard from "../../hooks/useDashboard";
import useBarangayOptions from "../../hooks/useBarangayOptions";

import useForm from "../../hooks/useForm";
import FormProvider from "../../components/forms/FormProvider";
import { SelectField } from "../../components/forms";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [filterChanging, setFilterChanging] = useState(false);
    const filterOverlayTimer = useRef(null);

    const role = user?.roles?.[0] ?? null;

    const isMunicipalRole = [
        "Super Administrator",
        "Administrator",
    ].includes(role);

    const {
        barangays,
        loading: barangaysLoading,
    } = useBarangayOptions();

    const barangayOptions = [
        {
            id: "",
            barangay: "All Barangays",
        },
        ...barangays,
    ];

    const periods = [
        { value: "", label: "Whole Year" },
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 5 },
        (_, index) => currentYear - index
    );

    const yearOptions = years.map((item) => ({
        value: item,
        label: String(item),
    }));

    const monthOptions = periods.map((period) => ({
        value: period.value,
        label: period.label,
    }));

    const filterForm = useForm({
        defaultValues: {
            barangay_id: "",
            year: new Date().getFullYear(),
            month: "",
        },
    });

    const barangayId = filterForm.getValue("barangay_id");
    const year = filterForm.getValue("year");
    const month = filterForm.getValue("month");

    const dashboardParams = {
        year: Number(year),

        ...(month !== "" && {
            month: Number(month),
        }),

        ...(isMunicipalRole && barangayId !== "" && {
            barangay_id: Number(barangayId),
        }),
    };

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    } = useDashboard(dashboardParams);

    const households = data?.households ?? {};
    const residents = data?.residents ?? {};
    const complaints = data?.complaints ?? {};
    const documents = data?.document_requests ?? {};
    const documentStatuses = documents?.statuses ?? {};

    useEffect(() => {

        if (isFetching) {
            if (filterOverlayTimer.current) {
                clearTimeout(filterOverlayTimer.current);
                filterOverlayTimer.current = null;
            }

            return;
        }

        if (filterChanging) {

            filterOverlayTimer.current = setTimeout(() => {

                setFilterChanging(false);

                filterOverlayTimer.current = null;

            }, 300);

        }

        return () => {

            if (filterOverlayTimer.current) {
                clearTimeout(filterOverlayTimer.current);
            }

        };

    }, [isFetching, filterChanging]);

    if (isLoading && !data) {

        return (

            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div className="flex flex-col items-center justify-center py-12">

                        <LoadingSpinner
                            size="md"
                            text="Loading dashboard..."
                        />

                    </div>

                </PageCard>

            </PageContainer>

        );

    }

    if (isError) {

        return (

            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">

                        <div className="font-semibold">
                            Unable to load dashboard.
                        </div>

                        <div className="mt-1 text-sm">
                            {error?.response?.data?.message ??
                                "Something went wrong while loading the dashboard."}
                        </div>

                    </div>

                </PageCard>

            </PageContainer>

        );

    }

    return (

        <PageContainer>

            <PageHeader />

            {/* =========================================================
                DASHBOARD FILTERS
            ========================================================= */}

            <FormProvider form={filterForm}>

                <PageCard
                    title="Dashboard Filters"
                    className="mb-6"
                >

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {isMunicipalRole ? (

                            <SelectField
                                name="barangay_id"
                                label="Barangay"
                                options={barangayOptions}
                                getOptionLabel={(option) =>
                                    option.barangay
                                }
                                getOptionValue={(option) =>
                                    String(option.id)
                                }
                                isLoading={barangaysLoading}
                                isDisabled={barangaysLoading}
                                onChange={() => {
                                    setFilterChanging(true);
                                }}
                            />

                        ) : (

                            <div>

                                <label
                                    className="
                                        mb-1
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-700
                                    "
                                >
                                    Barangay
                                </label>

                                <div
                                    className="
                                        flex
                                        min-h-[42px]
                                        items-center
                                        rounded-lg
                                        border
                                        border-slate-300
                                        bg-slate-100
                                        px-3
                                        text-sm
                                        text-slate-600
                                    "
                                >
                                    {user?.barangay_name ??
                                        "Assigned Barangay"}
                                </div>

                            </div>

                        )}

                        <SelectField
                            name="year"
                            label="Year"
                            options={yearOptions}
                            getOptionLabel={(option) =>
                                option.label
                            }
                            getOptionValue={(option) =>
                                String(option.value)
                            }
                            onChange={() => {
                                setFilterChanging(true);
                            }}
                        />

                        <SelectField
                            name="month"
                            label="Period"
                            options={monthOptions}
                            getOptionLabel={(option) =>
                                option.label
                            }
                            getOptionValue={(option) =>
                                String(option.value)
                            }
                            onChange={() => {
                                setFilterChanging(true);
                            }}
                        />

                    </div>

                </PageCard>

            </FormProvider>


            {/* =========================================================
                DASHBOARD DATA
            ========================================================= */}

            <div className="relative">

                {/* Filter-change loading overlay */}

                {filterChanging && (

                    <div
                        className="
                            absolute
                            inset-0
                            z-20
                            flex
                            items-start
                            justify-center
                            rounded-xl
                            bg-white/60
                            pt-16
                            backdrop-blur-[2px]
                        "
                    >

                        <LoadingSpinner
                            size="md"
                            text="Updating dashboard..."
                        />

                    </div>

                )}


                {/* =====================================================
                    OVERVIEW
                ===================================================== */}

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                    <DashboardCard
                        variant="small-box"
                        title="Households"
                        value={households.total}
                        icon={HomeIcon}
                        color="blue"
                        footer="Household Records"
                        // onFooterClick={() => navigate("/households")}
                    />

                    <DashboardCard
                        variant="small-box"
                        title="Residents"
                        value={residents.total}
                        icon={UserGroupIcon}
                        color="cyan"
                        footer="Resident Records"
                    />

                    <DashboardCard
                        variant="small-box"
                        title="Families"
                        value={households.total_families}
                        icon={UserGroupIcon}
                        color="green"
                        footer="Household Families"
                    />

                </div>

                {/* Document Request Statistics */}

                <div className="space-y-6 mb-4">

                    <PageCard
                        title="Document Requests"
                        loading={filterChanging}
                    >

                        {/* Summary Cards */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            <DashboardCard
                                variant="stat-box"
                                title="Total Requests"
                                value={documents?.total ?? 0}
                                icon={DocumentTextIcon}
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Pending"
                                value={
                                    documentStatuses?.pending?.total ??
                                    0
                                }
                                icon={ClockIcon}
                                color="yellow"
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Awaiting Payment"
                                value={
                                    documentStatuses?.awaiting_payment?.total ??
                                    0
                                }
                                icon={CreditCardIcon}
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Payment Received"
                                value={
                                    documentStatuses?.payment_received?.total ??
                                    0
                                }
                                icon={ClipboardDocumentCheckIcon}
                                color="green"
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="For Signature"
                                value={
                                    documentStatuses?.for_signature?.total ??
                                    0
                                }
                                icon={PencilSquareIcon}
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Ready for Release"
                                value={
                                    documentStatuses?.ready_for_release?.total ??
                                    0
                                }
                                icon={CheckCircleIcon}
                                color="cyan"
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Released"
                                value={
                                    documentStatuses?.released?.total ??
                                    0
                                }
                                icon={CheckCircleIcon}
                                color="green"
                            />

                        </div>

                    </PageCard>


                    {/* Document Request Analytics */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        {/* Most Requested Documents */}

                        <PageCard
                            title="Most Requested Documents"
                            loading={filterChanging}
                        >

                            <div className="space-y-4">

                                {(
                                    documents?.by_document_type ??
                                    []
                                ).length > 0 ? (

                                    documents.by_document_type
                                        .slice(0, 10)
                                        .map((item) => {

                                            const maximum =
                                                Math.max(
                                                    ...(
                                                        documents?.by_document_type ??
                                                        []
                                                    ).map(
                                                        (entry) =>
                                                            Number(entry.total)
                                                    ),
                                                    1
                                                );

                                            const total =
                                                Number(item.total);

                                            const width =
                                                `${(total / maximum) * 100}%`;

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            w-44
                                                            shrink-0
                                                            truncate
                                                            text-sm
                                                            text-slate-600
                                                        "
                                                        title={item.name}
                                                    >
                                                        {item.name}
                                                    </div>

                                                    <div className="flex-1">

                                                        <div
                                                            className="
                                                                h-7
                                                                overflow-hidden
                                                                rounded-md
                                                                bg-slate-100
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    h-full
                                                                    items-center
                                                                    rounded-md
                                                                    bg-blue-500
                                                                    px-2
                                                                    text-xs
                                                                    font-semibold
                                                                    text-white
                                                                    transition-all
                                                                "
                                                                style={{
                                                                    width:
                                                                        total > 0
                                                                            ? width
                                                                            : "0%",
                                                                }}
                                                            >
                                                                {total > 0 &&
                                                                    total}
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div
                                                        className="
                                                            w-12
                                                            text-right
                                                            text-sm
                                                            font-semibold
                                                            text-slate-700
                                                        "
                                                    >
                                                        {total}
                                                    </div>

                                                </div>
                                            );

                                        })

                                ) : (

                                    <div
                                        className="
                                            py-8
                                            text-center
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        No document requests found.
                                    </div>

                                )}

                            </div>

                        </PageCard>

                        {/* Document Requests by Barangay */}

                        {isMunicipalRole && (
                            <PageCard
                                title="Document Requests by Barangay"
                                loading={filterChanging}
                            >

                                <div className="space-y-4">

                                    {(
                                        documents?.by_barangay ??
                                        []
                                    ).length > 0 ? (

                                        documents.by_barangay
                                            .slice(0, 15)
                                            .map((item) => {

                                                const maximum =
                                                    Math.max(
                                                        ...(
                                                            documents?.by_barangay ??
                                                            []
                                                        ).map(
                                                            (entry) =>
                                                                Number(entry.total)
                                                        ),
                                                        1
                                                    );

                                                const total =
                                                    Number(item.total);

                                                const width =
                                                    `${(total / maximum) * 100}%`;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                w-44
                                                                shrink-0
                                                                truncate
                                                                text-sm
                                                                text-slate-600
                                                            "
                                                            title={item.name}
                                                        >
                                                            {item.name}
                                                        </div>

                                                        <div className="flex-1">

                                                            <div
                                                                className="
                                                                    h-7
                                                                    overflow-hidden
                                                                    rounded-md
                                                                    bg-slate-100
                                                                "
                                                            >

                                                                <div
                                                                    className="
                                                                        flex
                                                                        h-full
                                                                        items-center
                                                                        rounded-md
                                                                        bg-indigo-500
                                                                        px-2
                                                                        text-xs
                                                                        font-semibold
                                                                        text-white
                                                                        transition-all
                                                                    "
                                                                    style={{
                                                                        width:
                                                                            total > 0
                                                                                ? width
                                                                                : "0%",
                                                                    }}
                                                                >
                                                                    {total > 0 &&
                                                                        total}
                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div
                                                            className="
                                                                w-12
                                                                text-right
                                                                text-sm
                                                                font-semibold
                                                                text-slate-700
                                                            "
                                                        >
                                                            {total}
                                                        </div>

                                                    </div>
                                                );

                                            })

                                    ) : (

                                        <div
                                            className="
                                                py-8
                                                text-center
                                                text-sm
                                                text-slate-500
                                            "
                                        >
                                            No document requests found.
                                        </div>

                                    )}

                                </div>

                            </PageCard>
                        )}

                    </div>

                    {/* Monthly Document Requests */}

                    <PageCard
                        title="Document Requests by Month"
                        loading={filterChanging}
                        loadingText="Updating dashboard..."
                    >
                        <div className="flex h-72 items-end gap-2">

                            {(documents?.monthly ?? []).map((item) => {

                                const maximum = Math.max(
                                    ...(documents?.monthly ?? []).map(
                                        (entry) => Number(entry.total)
                                    ),
                                    1
                                );

                                const total = Number(item.total);

                                const height = `${(total / maximum) * 100}%`;

                                return (
                                    <div
                                        key={item.month}
                                        className="
                                            flex
                                            min-w-0
                                            flex-1
                                            flex-col
                                            items-center
                                            justify-end
                                            gap-2
                                        "
                                    >

                                        {/* Value */}
                                        <div
                                            className="
                                                text-xs
                                                font-semibold
                                                text-slate-700
                                            "
                                        >
                                            {total}
                                        </div>

                                        {/* Bar */}
                                        <div
                                            className="
                                                flex
                                                h-48
                                                w-full
                                                items-end
                                                rounded-md
                                                bg-slate-100
                                            "
                                        >
                                            <div
                                                className="
                                                    w-full
                                                    rounded-md
                                                    bg-blue-500
                                                    transition-all
                                                "
                                                style={{
                                                    height:
                                                        total > 0
                                                            ? height
                                                            : "0%",
                                                }}
                                            />
                                        </div>

                                        {/* Month */}
                                        <div
                                            className="
                                                text-xs
                                                text-slate-500
                                            "
                                        >
                                            {item.label.substring(0, 3)}
                                        </div>

                                    </div>
                                );

                            })}

                        </div>
                    </PageCard>

                </div>

                {/* =====================================================
                    COMPLAINT MONITORING
                ===================================================== */}

                <PageCard
                    title="Complaint Monitoring"
                    className="mb-4"
                    loading={filterChanging}
                    loadingText="Updating dashboard..."
                >

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                        <DashboardCard
                            variant="info-box"
                            title="Total"
                            value={complaints.total}
                            icon={ChatBubbleLeftRightIcon}
                            color="blue"
                        />

                        <DashboardCard
                            variant="info-box"
                            title="Unresolved"
                            value={complaints.unresolved}
                            icon={ClockIcon}
                            color="yellow"
                        />

                        <DashboardCard
                            variant="info-box"
                            title="Resolved"
                            value={complaints.resolved}
                            icon={CheckCircleIcon}
                            color="green"
                        />

                        <DashboardCard
                            variant="info-box"
                            title="Closed"
                            value={complaints.closed}
                            icon={CheckCircleIcon}
                            color="cyan"
                        />

                        <DashboardCard
                            variant="info-box"
                            title="Resolution Rate"
                            value={`${complaints.resolution_rate ?? 0}%`}
                            icon={CheckCircleIcon}
                            color="green"
                        />

                    </div>

                    {/* Most Common Complaint */}

                    {complaints?.by_type?.length > 0 && (

                        <div className="mt-5 border-t border-slate-100 pt-5">

                            <div className="mb-4 text-sm font-semibold text-slate-700">
                                Complaint Types
                            </div>

                            <div className="space-y-3">

                                {complaints.by_type.map((item) => {

                                    const maximum = Math.max(
                                        ...complaints.by_type.map(
                                            (entry) => Number(entry.total)
                                        ),
                                        1
                                    );

                                    const total = Number(item.total);

                                    const width =
                                        `${(total / maximum) * 100}%`;

                                    return (
                                        <div
                                            key={item.id}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            {/* Complaint Type */}

                                            <div
                                                className="
                                                    w-48
                                                    shrink-0
                                                    truncate
                                                    text-sm
                                                    text-slate-600
                                                "
                                                title={item.name}
                                            >
                                                {item.name}
                                            </div>

                                            {/* Bar */}

                                            <div className="flex-1">

                                                <div
                                                    className="
                                                        h-7
                                                        overflow-hidden
                                                        rounded-md
                                                        bg-slate-100
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-full
                                                            items-center
                                                            rounded-md
                                                            bg-amber-500
                                                            px-2
                                                            text-xs
                                                            font-semibold
                                                            text-white
                                                            transition-all
                                                        "
                                                        style={{
                                                            width:
                                                                total > 0
                                                                    ? width
                                                                    : "0%",
                                                        }}
                                                    >
                                                        {total > 0 && total}

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Count */}

                                            <div
                                                className="
                                                    w-10
                                                    text-right
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                "
                                            >
                                                {total}
                                            </div>

                                        </div>
                                    );

                                })}

                            </div>

                        </div>

                    )}

                </PageCard>

            </div>

        </PageContainer>

    );
}