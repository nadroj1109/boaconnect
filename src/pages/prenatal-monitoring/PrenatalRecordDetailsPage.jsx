import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeftIcon,
    PrinterIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import { DataTable } from "../../components/datatable";
import { DefaultButton } from "../../components/button";
import { useDialog } from "../../components/dialog";

import useDataTable from "../../hooks/useDataTable";

import prenatalRecordService from "../../services/prenatalRecordService";
import PrenatalVisitModal from "../../components/prenatal-monitoring/PrenatalVisitModal";

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

function visitLabel(number) {
    if (!number) return "Unscheduled Consultation";

    const suffix =
        number === 1 ? "st" :
        number === 2 ? "nd" :
        number === 3 ? "rd" : "th";

    return `${number}${suffix} Visit`;
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

export default function PrenatalRecordDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { confirm } = useDialog();

    const table = useDataTable();

    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [visitModalOpen, setVisitModalOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await prenatalRecordService.show(id);
            setRecord(response.data.data);
        } catch (err) {
            console.error("Unable to load prenatal record:", err);

            setError(
                err.response?.data?.message ??
                "Unable to load prenatal record."
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const visits = useMemo(() => {
        return [...(record?.visits ?? [])].sort((a, b) => {
            if (!a.visit_number && !b.visit_number) {
                return new Date(a.visit_date) - new Date(b.visit_date);
            }

            if (!a.visit_number) return 1;
            if (!b.visit_number) return -1;

            return a.visit_number - b.visit_number;
        });
    }, [record]);

    function openAddVisit() {
        setSelectedVisit(null);
        setVisitModalOpen(true);
    }

    function openEditVisit(visit) {
        setSelectedVisit(visit);
        setVisitModalOpen(true);
    }

    function closeVisitModal() {
        setVisitModalOpen(false);
        setSelectedVisit(null);
    }

    function handleDeleteVisit(visit) {
        confirm({
            title: "Delete Prenatal Visit",
            message: "Are you sure you want to delete this prenatal visit?",
            confirmText: "Delete Visit",
            confirmColor: "red",
            loading: "Deleting prenatal visit...",
            success: "Prenatal visit deleted successfully.",
            error: "Unable to delete prenatal visit.",
            action: () =>
                prenatalRecordService.deleteVisit(record.id, visit.id),
            onSuccess: refresh,
        });
    }

    const columns = [
        {
            key: "visit_number",
            title: "Visit",
            render: (row) => (
                <span className="font-semibold text-slate-800">
                    {visitLabel(row.visit_number)}
                </span>
            ),
        },
        {
            key: "visit_date",
            title: "Date",
            sortable: true,
            render: (row) => formatDate(row.visit_date),
            nowrap: true,
        },
        {
            key: "aog",
            title: "AOG",
            render: (row) => {
                if (
                    row.aog_weeks === null ||
                    row.aog_weeks === undefined
                ) {
                    return "—";
                }

                return `${row.aog_weeks} weeks ${row.aog_days ?? 0} days`;
            },
        },
        {
            key: "blood_pressure",
            title: "BP",
            render: (row) => displayValue(row.blood_pressure),
        },
        {
            key: "weight",
            title: "Weight",
            render: (row) => displayValue(row.weight),
        },
        {
            key: "fundal_height",
            title: "FH",
            render: (row) => displayValue(row.fundal_height),
        },
        {
            key: "fetal_heart_beat",
            title: "FHB",
            render: (row) => displayValue(row.fetal_heart_beat),
        },
        {
            key: "presentation",
            title: "Presentation",
            render: (row) => displayValue(row.presentation),
        },
    ];

    const pagination = {
        current_page: 1,
        last_page: 1,
        per_page: visits.length || 10,
        total: visits.length,
        from: visits.length ? 1 : null,
        to: visits.length || null,
    };

    const resident = record?.resident ?? {};

    return (
        <PageContainer>
            <PageHeader />

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <DefaultButton
                    onClick={() => navigate("/prenatal-monitoring")}
                    icon={ArrowLeftIcon}
                    size="xs"
                >
                    Back to Prenatal Records
                </DefaultButton>

                {record && (
                    <DefaultButton
                        onClick={() =>
                            navigate(`/prenatal-monitoring/${record.id}/print`)
                        }
                        icon={PrinterIcon}
                        size="xs"
                    >
                        View Printable Page
                    </DefaultButton>
                )}
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
                    Loading prenatal record...
                </div>
            )}

            {record && (
                <div className="space-y-5">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {resident.full_name ?? "Prenatal Record"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Prenatal monitoring record
                        </p>
                    </div>

                    <InformationSection title="Resident Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Resident Name"
                                value={resident.full_name}
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
                                label="Civil Status"
                                value={resident.civil_status}
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

                    <InformationSection title="Pregnancy Registration">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Date of Registration"
                                value={formatDate(record.registration_date)}
                            />
                            <InformationItem
                                label="Spouse Name"
                                value={record.spouse_name}
                            />
                            <InformationItem
                                label="OB Score"
                                value={record.ob_score}
                            />
                            <InformationItem
                                label="Last Menstrual Period (LMP)"
                                value={formatDate(record.lmp)}
                            />
                            <InformationItem
                                label="Expected Date of Confinement (EDC)"
                                value={formatDate(record.edc)}
                            />
                            <InformationItem
                                label="Height"
                                value={record.height}
                            />
                            <InformationItem
                                label="Initial Weight"
                                value={record.initial_weight}
                            />
                            <InformationItem
                                label="BMI"
                                value={record.bmi}
                            />
                        </div>
                    </InformationSection>

                    <InformationSection title="Medical and Family History">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <InformationItem
                                label="Past Medical History"
                                value={record.past_medical_history}
                            />
                            <InformationItem
                                label="Family History"
                                value={record.family_history}
                            />
                        </div>
                    </InformationSection>

                    <InformationSection title="Tetanus Toxoid Immunization">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {[1, 2, 3, 4, 5].map((number) => (
                                <InformationItem
                                    key={number}
                                    label={`TT ${number}`}
                                    value={formatDate(record[`tt${number}_date`])}
                                />
                            ))}
                        </div>
                    </InformationSection>

                    {(record.pregnancy_outcome || record.remarks) && (
                        <InformationSection title="Pregnancy Outcome and Remarks">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InformationItem
                                    label="Pregnancy Outcome"
                                    value={record.pregnancy_outcome}
                                />
                                <InformationItem
                                    label="Remarks"
                                    value={record.remarks}
                                />
                            </div>
                        </InformationSection>
                    )}

                    <DataTable
                        title="Prenatal Visit Monitoring"
                        subtitle={`${visits.length} visit(s) recorded. Add or update visit details as monitoring progresses.`}
                        columns={columns}
                        rows={visits}
                        loading={loading}
                        pagination={pagination}
                        table={table}
                        onRefresh={refresh}
                        onCreate={openAddVisit}
                        onCreateText="Add Visit"
                        actions={{
                            edit: openEditVisit,

                            delete: handleDeleteVisit,
                        }}
                    />

                    <PrenatalVisitModal
                        open={visitModalOpen}
                        prenatalRecordId={record.id}
                        visit={selectedVisit}
                        onClose={closeVisitModal}
                        onSuccess={refresh}
                    />
                </div>
            )}
        </PageContainer>
    );
}
