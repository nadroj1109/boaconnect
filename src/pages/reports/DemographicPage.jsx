import { useState, useEffect, useRef } from "react";

import {
    AcademicCapIcon,
    BriefcaseIcon,
    HomeIcon,
    UserGroupIcon,
    UserIcon,
    UserMinusIcon,
} from "@heroicons/react/24/outline";

import {
    BarChart,
    Bar,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

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

export default function DemographicPage() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [filterChanging, setFilterChanging] = useState(false);
    const filterOverlayTimer = useRef(null);

    const [showAllEthnicities, setShowAllEthnicities] = useState(false);

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

    const filterForm = useForm({
        defaultValues: {
            barangay_id: "",
        },
    });

    const barangayId = filterForm.getValue("barangay_id");

    const dashboardParams = {
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
    const residents =  data?.residents ?? {};

    const sectors = residents?.sectors ?? {};
    const sex = residents?.sex ?? {};
    const ageGroups = residents?.age_groups ?? [];
    const ethnicities = residents?.ethnicities ?? [];
    const educationalAttainment = residents?.educational_attainment ?? [];

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

    /*
    |--------------------------------------------------------------------------
    | Initial Loading
    |--------------------------------------------------------------------------
    */

    if (isLoading && !data) {
        return (
            <PageContainer>
                <PageHeader
                    title="Demographic Reports"
                    description="View household and resident demographic statistics."
                />

                <div className="py-20">
                    <LoadingSpinner
                        size="lg"
                        text="Loading demographic data..."
                    />
                </div>
            </PageContainer>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (isError) {
        return (
            <PageContainer>
                <PageHeader
                    title="Demographic Reports"
                    description="View household and resident demographic statistics."
                />

                <PageCard>
                    <div className="py-8 text-center">
                        <p className="text-sm text-red-600">
                            Unable to load demographic data.
                        </p>

                        {error?.response?.data?.message && (
                            <p className="mt-2 text-sm text-slate-500">
                                {error.response.data.message}
                            </p>
                        )}
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
                    title="Filters"
                    className="mb-6"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {isMunicipalRole && (
                            <SelectField
                                name="barangay_id"
                                label="Barangay"
                                options={barangayOptions.map(
                                    (barangay) => ({
                                        value: barangay.id,
                                        label: barangay.barangay,
                                    })
                                )}
                                disabled={barangaysLoading}
                                onChange={() =>
                                    setFilterChanging(true)
                                }
                            />
                        )}

                    </div>

                    {!isMunicipalRole && (
                        <p className="mt-1 text-sm text-slate-500">
                            Showing demographic statistics for your
                            assigned barangay.
                        </p>
                    )}
                </PageCard>

            </FormProvider>


            {/* ---------------------------------------------------------------- */}
            {/* Demographic Content */}
            {/* ---------------------------------------------------------------- */}

            <div className="relative">

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
                            text="Updating demographic data..."
                        />
                    </div>
                )}

                <div
                    className={
                        filterChanging
                            ? "pointer-events-none opacity-50"
                            : ""
                    }
                >

                    {/* ====================================================== */}
                    {/* Overview */}
                    {/* ====================================================== */}

                    <PageCard
                        title="Overview"
                        className="mb-6"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                            <DashboardCard
                                variant="stat-box"
                                title="Households"
                                value={
                                    households?.total ?? 0
                                }
                                icon={HomeIcon}
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Residents"
                                value={
                                    residents?.total ?? 0
                                }
                                icon={UserGroupIcon}
                            />

                            <DashboardCard
                                variant="stat-box"
                                title="Families"
                                value={
                                    households?.families ?? 0
                                }
                                icon={HomeIcon}
                            />

                        </div>
                    </PageCard>

                    {/* ====================================================== */}
                    {/* Resident Statistics */}
                    {/* ====================================================== */}

                    <PageCard
                        title="Resident Statistics by Sector"
                        className="mb-6"
                    >
                        <div className="h-[420px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart
                                    layout="vertical"
                                    data={[
                                        {
                                            label: "Employed",
                                            total: sectors?.employed ?? 0,
                                        },
                                        {
                                            label: "Unemployed",
                                            total: sectors?.unemployed ?? 0,
                                        },
                                        {
                                            label: "Senior Citizens",
                                            total: sectors?.senior_citizen ?? 0,
                                        },
                                        {
                                            label: "PWD",
                                            total: sectors?.pwd ?? 0,
                                        },
                                        {
                                            label: "Indigenous",
                                            total: sectors?.indigenous ?? 0,
                                        },
                                        {
                                            label: "Students",
                                            total: sectors?.student ?? 0,
                                        },
                                        {
                                            label: "Solo Parents",
                                            total: sectors?.solo_parent ?? 0,
                                        },
                                    ]}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 20,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        type="number"
                                        allowDecimals={false}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="label"
                                        width={120}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                    />

                                    <Tooltip
                                        formatter={(value) => [
                                            value,
                                            "Residents",
                                        ]}
                                    />

                                    <Bar
                                        dataKey="total"
                                        name="Residents"
                                        radius={[0, 4, 4, 0]}
                                    >
                                        <Cell fill="#16A34A" />
                                        <Cell fill="#DC2626" />
                                        <Cell fill="#7C3AED" />
                                        <Cell fill="#2563EB" />
                                        <Cell fill="#D97706" />
                                        <Cell fill="#0891B2" />
                                        <Cell fill="#DB2777" />
                                    </Bar>

                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </PageCard>

                    {/* ====================================================== */}
                    {/* Sex & Age */}
                    {/* ====================================================== */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        {/* -------------------------------------------------- */}
                        {/* Sex Distribution */}
                        {/* -------------------------------------------------- */}

                        <PageCard title="Sex Distribution">

                            <div className="h-80">

                                {(sex?.male ?? 0) + (sex?.female ?? 0) === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-sm text-slate-500">
                                            No sex data available.
                                        </p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>

                                            <Pie
                                                data={[
                                                    {
                                                        name: "Male",
                                                        value: sex?.male ?? 0,
                                                    },
                                                    {
                                                        name: "Female",
                                                        value: sex?.female ?? 0,
                                                    },
                                                ]}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="45%"
                                                outerRadius={100}
                                                innerRadius={55}
                                                paddingAngle={2}
                                            >
                                                <Cell fill="#2563EB" />
                                                <Cell fill="#DB2777" />
                                            </Pie>

                                            <Tooltip
                                                formatter={(value) => [
                                                    value,
                                                    "Residents",
                                                ]}
                                            />

                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                            />

                                        </PieChart>
                                    </ResponsiveContainer>
                                )}

                            </div>

                        </PageCard>

                        {/* -------------------------------------------------- */}
                        {/* Age Distribution */}
                        {/* -------------------------------------------------- */}

                        <PageCard title="Age Distribution">

                            <div className="h-80">

                                {ageGroups.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-sm text-slate-500">
                                            No age data available.
                                        </p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={ageGroups}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 0,
                                                bottom: 10,
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                            />

                                            <XAxis
                                                dataKey="label"
                                                tick={{
                                                    fontSize: 12,
                                                }}
                                            />

                                            <YAxis
                                                allowDecimals={false}
                                                tick={{
                                                    fontSize: 12,
                                                }}
                                            />

                                            <Tooltip
                                                formatter={(value) => [
                                                    value,
                                                    "Residents",
                                                ]}
                                            />

                                            <Bar
                                                dataKey="total"
                                                name="Residents"
                                                radius={[4, 4, 0, 0]}
                                            >
                                                <Cell fill="#16A34A" />
                                                <Cell fill="#DC2626" />
                                                <Cell fill="#7C3AED" />
                                                <Cell fill="#2563EB" />
                                                <Cell fill="#D97706" />
                                                <Cell fill="#0891B2" />
                                                <Cell fill="#DB2777" />
                                                <Cell fill="#65A30D" />
                                            </Bar>

                                        </BarChart>
                                    </ResponsiveContainer>
                                )}

                            </div>

                        </PageCard>

                    </div>

                    {/* ====================================================== */}
                    {/* Educational Attainment */}
                    {/* ====================================================== */}

                    <PageCard
                        title="Educational Attainment"
                        className="mt-6"
                    >
                        <div className="h-[420px]">

                            {educationalAttainment.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-sm text-slate-500">
                                        No educational attainment data available.
                                    </p>
                                </div>
                            ) : (
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={educationalAttainment}
                                        layout="vertical"
                                        margin={{
                                            top: 10,
                                            right: 20,
                                            left: 20,
                                            bottom: 10,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            type="number"
                                            allowDecimals={false}
                                        />

                                        <YAxis
                                            type="category"
                                            dataKey="label"
                                            width={140}
                                            tick={{
                                                fontSize: 12,
                                            }}
                                        />

                                        <Tooltip
                                            formatter={(value) => [
                                                value,
                                                "Residents",
                                            ]}
                                        />

                                        <Bar
                                            dataKey="total"
                                            name="Residents"
                                            radius={[0, 4, 4, 0]}
                                        >
                                            <Cell fill="#16A34A" />
                                            <Cell fill="#DC2626" />
                                            <Cell fill="#7C3AED" />
                                            <Cell fill="#2563EB" />
                                            <Cell fill="#D97706" />
                                            <Cell fill="#0891B2" />
                                            <Cell fill="#DB2777" />
                                            <Cell fill="#65A30D" />
                                            <Cell fill="#16A34A" />
                                            <Cell fill="#DC2626" />
                                            <Cell fill="#7C3AED" />
                                            <Cell fill="#2563EB" />
                                            <Cell fill="#D97706" />
                                            <Cell fill="#0891B2" />
                                        </Bar>

                                    </BarChart>
                                </ResponsiveContainer>
                            )}

                        </div>
                    </PageCard>

                    {/* ====================================================== */}
                    {/* Ethnicity */}
                    {/* ====================================================== */}

                    <PageCard
                        title="Ethnicity Distribution"
                        className="mt-6"
                    >
                        {ethnicities.length === 0 ? (
                            <div className="flex h-40 items-center justify-center">
                                <p className="text-sm text-slate-500">
                                    No ethnicity data available.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="divide-y divide-slate-100">
                                    {(showAllEthnicities
                                        ? ethnicities
                                        : ethnicities.slice(0, 10)
                                    ).map((item) => (
                                        <div
                                            key={item.id}
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                py-3
                                            "
                                        >
                                            <span className="text-sm text-slate-700">
                                                {item.name}
                                            </span>

                                            <span
                                                className="
                                                    shrink-0
                                                    rounded-full
                                                    bg-slate-100
                                                    px-3
                                                    py-1
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                "
                                            >
                                                {item.total}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {ethnicities.length > 10 && (
                                    <div className="mt-4 border-t border-slate-100 pt-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAllEthnicities(
                                                    (current) => !current
                                                )
                                            }
                                            className="
                                                text-sm
                                                font-medium
                                                text-green-600
                                                transition
                                                hover:text-green-700
                                            "
                                        >
                                            {showAllEthnicities
                                                ? "Show Top 10"
                                                : `View All (${ethnicities.length})`}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </PageCard>

                </div>
            </div>

        </PageContainer>

    );
}