import { Fragment, useEffect, useMemo, useState } from "react";
import { PrinterIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import childNutritionMonitoringService from "../../services/childNutritionMonitoringService";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const currentYear = new Date().getFullYear();

function formatDate(date) {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return date;

    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    const year = parsed.getFullYear();

    return `${month}/${day}/${year}`;
}

function displayValue(value) {
    return value === null || value === undefined || value === ""
        ? "—"
        : value;
}

function getAssessment(record, month) {
    return record.assessments?.find(
        assessment => Number(assessment.assessment_month) === month
    );
}

export default function ChildNutritionMonitoringReportPage() {
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const yearOptions = useMemo(
        () =>
            Array.from(
                { length: 6 },
                (_, index) => currentYear - index
            ),
        []
    );

    async function fetchReport() {
        setLoading(true);
        setError(null);

        try {
            const response =
                await childNutritionMonitoringService.getReport({
                    monitoring_year: selectedYear,
                });

            setRecords(response.data.data ?? []);
        } catch (err) {
            console.error(
                "Unable to retrieve child nutrition report:",
                err
            );

            setError(
                err.response?.data?.message ??
                "Unable to retrieve the child nutrition monitoring report."
            );

            setRecords([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReport();
    }, [selectedYear]);

    function handlePrint() {
        window.print();
    }

    return (
        <PageContainer>
            <PageHeader
                title="Child Nutrition Monitoring Report"
                description="Monthly growth monitoring of identified malnourished children."
            />

            {/* Report Filters */}
            <PageCard
                title="Report Filters"
                className="mb-6 print:hidden"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="w-full sm:max-w-xs">
                        <label
                            htmlFor="monitoring_year"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Monitoring Year
                        </label>

                        <select
                            id="monitoring_year"
                            value={selectedYear}
                            onChange={event =>
                                setSelectedYear(Number(event.target.value))
                            }
                            className="
                                w-full rounded-lg border border-slate-300
                                bg-white px-3 py-2.5 text-sm text-slate-700
                                outline-none focus:border-blue-500
                                focus:ring-2 focus:ring-blue-100
                            "
                        >
                            {yearOptions.map(year => (
                                <option key={year} value={year}>
                                    CY {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={fetchReport}
                            disabled={loading}
                            className="
                                inline-flex items-center justify-center gap-2
                                rounded-lg border border-slate-300
                                px-4 py-2.5 text-sm font-medium text-slate-700
                                transition hover:bg-slate-50
                                disabled:cursor-not-allowed disabled:opacity-50
                            "
                        >
                            <ArrowPathIcon className="h-4 w-4" />
                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={handlePrint}
                            disabled={loading || records.length === 0}
                            className="
                                inline-flex items-center justify-center gap-2
                                rounded-lg bg-blue-600 px-4 py-2.5
                                text-sm font-medium text-white
                                transition hover:bg-blue-700
                                disabled:cursor-not-allowed disabled:opacity-50
                            "
                        >
                            <PrinterIcon className="h-4 w-4" />
                            Print Report
                        </button>
                    </div>
                </div>
            </PageCard>

            {/* Loading */}
            {loading && (
                <PageCard>
                    <div className="py-12">
                        <LoadingSpinner
                            size="lg"
                            text="Loading child nutrition report..."
                        />
                    </div>
                </PageCard>
            )}

            {/* Error */}
            {!loading && error && (
                <PageCard>
                    <div className="py-8 text-center text-sm text-red-600">
                        {error}
                    </div>
                </PageCard>
            )}

            {/* Report */}
            {!loading && !error && (
                <PageCard>
                    <div className="report-container">
                        <div className="mb-4 flex items-center justify-between print:hidden">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-800">
                                    Annual Monitoring Sheet
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {records.length} registered children for CY {selectedYear}
                                </p>
                            </div>
                        </div>

                        <div className="report-table-wrapper">
                            <table className="nutrition-report">
                                <thead>
                                    <tr>
                                        <th colSpan={103} className="report-main-title">
                                            MONTHLY GROWTH MONITORING OF IDENTIFIED MALNOURISH
                                        </th>
                                    </tr>

                                    <tr>
                                        <th colSpan={103} className="report-year">
                                            CY {selectedYear}
                                        </th>
                                    </tr>

                                    <tr>
                                        <th rowSpan={3}>Child Seq. No.</th>
                                        <th rowSpan={3}>
                                            Name of Mother/Father/Caregiver (Surname, First name, M.I.)
                                        </th>
                                        <th rowSpan={3}>
                                            Name of Child (Surname, First name, M.I.)
                                        </th>
                                        <th rowSpan={3}>Gender</th>
                                        <th rowSpan={3}>Date of Birth (MM/DD/YYYY)</th>
                                        <th rowSpan={3}>Birthweight (kg)</th>
                                        <th rowSpan={3}>Low Birth Weight (&lt;2.5kg)</th>

                                        {MONTHS.map(month => (
                                            <th key={month} colSpan={8} className="month-heading">
                                                {month.toUpperCase()}
                                            </th>
                                        ))}
                                    </tr>

                                    <tr>
                                        {MONTHS.map(month => (
                                            <Fragment key={month}>
                                                <th rowSpan={2}>Age in Mos.</th>
                                                <th rowSpan={2}>Weight (kg)</th>
                                                <th rowSpan={2}>Height (cm)</th>
                                                <th rowSpan={2}>MUAC / Edema (-, +)</th>
                                                <th colSpan={4}>Nutritional Status</th>
                                            </Fragment>
                                        ))}
                                    </tr>

                                    <tr>
                                        {MONTHS.map(month => (
                                            <Fragment key={month}>
                                                <th>Weight for Age</th>
                                                <th>Height for Age</th>
                                                <th>Weight for Height / Length</th>
                                                <th>MUAC / Edema</th>
                                            </Fragment>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {records.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7 + (MONTHS.length * 8)}
                                                className="empty-report"
                                            >
                                                No monitoring records found for CY {selectedYear}.
                                            </td>
                                        </tr>
                                    ) : (
                                        records.map(record => (
                                            <tr key={record.id}>
                                                <td>{displayValue(record.sequence_no)}</td>
                                                <td>{displayValue(record.caregiver_name)}</td>
                                                <td>
                                                    {displayValue(record.resident?.full_name)}
                                                </td>
                                                <td>
                                                    {displayValue(record.resident?.sex)}
                                                </td>
                                                <td>
                                                    {formatDate(record.resident?.date_of_birth)}
                                                </td>
                                                <td>{displayValue(record.birthweight)}</td>
                                                <td>
                                                    {record.low_birth_weight === null ||
                                                    record.low_birth_weight === undefined
                                                        ? "—"
                                                        : record.low_birth_weight
                                                            ? "Yes"
                                                            : "No"}
                                                </td>

                                                {MONTHS.map((month, index) => {
                                                    const assessment = getAssessment(
                                                        record,
                                                        index + 1
                                                    );

                                                    return (
                                                        <Fragment key={month}>
                                                            <td>
                                                                {displayValue(assessment?.age_months)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.weight)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.height)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.muac)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.weight_for_age)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.height_for_age)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.weight_for_height)}
                                                            </td>
                                                            <td>
                                                                {displayValue(assessment?.muac_edema_status)}
                                                            </td>
                                                        </Fragment>
                                                    );
                                                })}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </PageCard>
            )}

            <style>{`
                .report-table-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                }

                .nutrition-report {
                    width: max-content;
                    min-width: 100%;
                    border-collapse: collapse;
                    font-size: 10px;
                    color: #111827;
                }

                .nutrition-report th,
                .nutrition-report td {
                    border: 1px solid #64748b;
                    padding: 5px 6px;
                    text-align: center;
                    vertical-align: middle;
                    min-width: 65px;
                }

                .nutrition-report th {
                    background: #f1f5f9;
                    font-weight: 600;
                }

                .nutrition-report .report-main-title {
                    font-size: 14px;
                    font-weight: 700;
                    text-align: left;
                    padding: 10px;
                }

                .nutrition-report .report-year {
                    text-align: left;
                    font-size: 12px;
                }

                .nutrition-report .month-heading {
                    background: #e2e8f0;
                    font-weight: 700;
                }

                .nutrition-report .month-subheading {
                    background: #f8fafc;
                }

                .nutrition-report tbody td {
                    height: 32px;
                    white-space: nowrap;
                }

                .nutrition-report .empty-report {
                    padding: 24px;
                    text-align: center;
                    color: #64748b;
                }

                @media print {
                    @page {
                        size: A3 landscape;
                        margin: 8mm;
                    }

                    body {
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    body * {
                        visibility: hidden;
                    }

                    .report-container,
                    .report-container * {
                        visibility: visible;
                    }

                    .report-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0 !important;
                    }

                    .report-table-wrapper {
                        overflow: visible !important;
                        border: none !important;
                        border-radius: 0 !important;
                    }

                    .nutrition-report {
                        width: 100%;
                        min-width: 0;
                        table-layout: fixed;
                        font-size: 5px;
                    }

                    .nutrition-report th,
                    .nutrition-report td {
                        min-width: 0;
                        padding: 2px 1px;
                        overflow-wrap: anywhere;
                        border: 0.5px solid #333;
                    }

                    .nutrition-report th {
                        background: #e2e8f0 !important;
                    }

                    .nutrition-report .report-main-title {
                        font-size: 9px;
                    }

                    .nutrition-report .report-year {
                        font-size: 7px;
                    }

                    .nutrition-report tbody tr {
                        break-inside: avoid;
                    }

                    .nutrition-report thead {
                        display: table-header-group;
                    }

                    .nutrition-report tfoot {
                        display: table-footer-group;
                    }
                }
            `}</style>
        </PageContainer>
    );
}
