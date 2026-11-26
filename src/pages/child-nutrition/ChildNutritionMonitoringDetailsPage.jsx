import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import { DataTable } from "../../components/datatable";
import { DefaultButton } from "../../components/button";
import { useDialog } from "../../components/dialog";

import useDataTable from "../../hooks/useDataTable";

import childNutritionMonitoringService from "../../services/childNutritionMonitoringService";
import ChildNutritionAssessmentModal from "../../components/child-nutrition/ChildNutritionAssessmentModal";

function displayValue(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return String(value);
}

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString();
}

function monthLabel(month) {
    return [
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
    ][Number(month) - 1] ?? "—";
}

function InformationItem({ label, value }) {
    return (
        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-800">
                {displayValue(value)}
            </p>
        </div>
    );
}

function InformationSection({ title, children }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-800">
                {title}
            </h3>

            {children}
        </section>
    );
}

export default function ChildNutritionMonitoringDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { confirm } = useDialog();

    const table = useDataTable();

    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response =
                await childNutritionMonitoringService.show(id);

            setRecord(response.data.data);
        } catch (err) {
            console.error(
                "Unable to load child nutrition monitoring record:",
                err
            );

            setError(
                err.response?.data?.message ??
                "Unable to load child nutrition monitoring record."
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const assessments = useMemo(() => {
        return [...(record?.assessments ?? [])].sort(
            (a, b) => a.assessment_month - b.assessment_month
        );
    }, [record]);

    function openAddAssessment() {
        setSelectedAssessment(null);
        setAssessmentModalOpen(true);
    }

    function openEditAssessment(assessment) {
        setSelectedAssessment(assessment);
        setAssessmentModalOpen(true);
    }

    function closeAssessmentModal() {
        setAssessmentModalOpen(false);
        setSelectedAssessment(null);
    }

    function handleDeleteAssessment(assessment) {
        confirm({
            title: "Delete Monthly Assessment",
            message: "Are you sure you want to delete this monthly assessment?",
            confirmText: "Delete Assessment",
            confirmColor: "red",
            loading: "Deleting assessment...",
            success: "Monthly assessment deleted successfully.",
            error: "Unable to delete monthly assessment.",
            action: () =>
                childNutritionMonitoringService.deleteAssessment(
                    record.id,
                    assessment.id
                ),
            onSuccess: refresh,
        });
    }

    const columns = [
        {
            key: "assessment_month_name",
            title: "Month",
        },
        {
            key: "assessment_date",
            title: "Assessment Date",
        },
        {
            key: "age_months",
            title: "Age (Months)",
        },
        {
            key: "weight",
            title: "Weight (kg)",
        },
        {
            key: "height",
            title: "Height (cm)",
        },
        {
            key: "muac",
            title: "MUAC/ Edema (-, +)",
        },
        {
            key: "weight_for_age",
            title: "Weight for Age",
        },
        {
            key: "height_for_age",
            title: "Height for Age",
        },
        {
            key: "weight_for_height",
            title: "Weight for Height/Length",
        },
        {
            key: "muac_edema_status",
            title: "MUAC/Edema",
        },
    ];

    const pagination = {
        current_page: 1,
        last_page: 1,
        per_page: assessments.length || 10,
        total: assessments.length,
        from: assessments.length ? 1 : null,
        to: assessments.length || null,
    };

    const resident = record?.resident ?? {};

    return (
        <PageContainer>
            <PageHeader />

            <div className="mb-4">
                <DefaultButton
                    onClick={() => navigate("/child-nutrition-monitoring")}
                    icon={ArrowLeftIcon}
                    size="xs"
                >
                    Back to Child Nutrition Monitoring
                </DefaultButton>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {loading && !record && (
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
                    Loading child nutrition monitoring record...
                </div>
            )}

            {record && (
                <div className="space-y-5">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {resident.full_name ?? "Child Nutrition Record"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Annual Child Nutrition Monitoring — CY {record.monitoring_year}
                        </p>
                    </div>

                    <InformationSection title="Child Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Child Name"
                                value={resident.full_name}
                            />

                            <InformationItem
                                label="Sex"
                                value={resident.sex}
                            />

                            <InformationItem
                                label="Date of Birth"
                                value={formatDate(resident.date_of_birth)}
                            />

                            <InformationItem
                                label="Age"
                                value={resident.age}
                            />

                            <InformationItem
                                label="Purok / Sitio"
                                value={resident.sitio_purok}
                            />

                            <InformationItem
                                label="Contact Number"
                                value={resident.mobile_no}
                            />
                        </div>
                    </InformationSection>

                    <InformationSection title="Annual Monitoring Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Monitoring Year"
                                value={record.monitoring_year}
                            />

                            <InformationItem
                                label="Child Sequence Number"
                                value={record.sequence_no}
                            />

                            <InformationItem
                                label="Mother / Father / Caregiver"
                                value={record.caregiver_name}
                            />

                            <InformationItem
                                label="Birthweight (kg)"
                                value={record.birthweight}
                            />

                            <InformationItem
                                label="Low Birth Weight"
                                value={
                                    record.low_birth_weight === null
                                        ? "—"
                                        : record.low_birth_weight
                                            ? "Yes"
                                            : "No"
                                }
                            />
                        </div>
                    </InformationSection>

                    <DataTable
                        title="Monthly Growth Assessments"
                        subtitle={`${assessments.length} of 12 monthly assessment(s) recorded for CY ${record.monitoring_year}.`}
                        columns={columns}
                        rows={assessments}
                        loading={loading}
                        pagination={pagination}
                        table={table}
                        onRefresh={refresh}
                        onCreate={openAddAssessment}
                        onCreateText="Add Assessment"
                        actions={{
                            edit: openEditAssessment,
                            delete: handleDeleteAssessment,
                        }}
                    />

                    <ChildNutritionAssessmentModal
                        open={assessmentModalOpen}
                        monitoringRecordId={record.id}
                        assessment={selectedAssessment}
                        onClose={closeAssessmentModal}
                        onSuccess={refresh}
                    />
                </div>
            )}
        </PageContainer>
    );
}
