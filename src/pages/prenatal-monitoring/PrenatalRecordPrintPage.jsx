import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeftIcon,
    PrinterIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import { DefaultButton, PrimaryButton } from "../../components/button";

import prenatalRecordService from "../../services/prenatalRecordService";

import "./PrenatalRecordPrintPage.css";

function valueOrDash(value) {
    return value === null || value === undefined || value === ""
        ? "—"
        : String(value);
}

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
}

function formatAog(visit) {
    if (visit.aog_weeks === null || visit.aog_weeks === undefined) {
        return "—";
    }

    return `${visit.aog_weeks}w ${visit.aog_days ?? 0}d`;
}

function getVisitValue(visit, field) {
    if (!visit) return "—";

    switch (field) {
        case "visit_date":
            return formatDate(visit.visit_date);

        case "aog":
            return formatAog(visit);

        default:
            return valueOrDash(visit[field]);
    }
}

function PrintCell({ label, value }) {
    return (
        <div className="print-cell-content">
            <strong>{label}</strong>
            <span>{valueOrDash(value)}</span>
        </div>
    );
}

const visitColumns = [
    { number: 1, title: "1st Visit", subtitle: "8–12 wks / 2–4 mos" },
    { number: 2, title: "2nd Visit", subtitle: "20 wks / 5 mos" },
    { number: 3, title: "3rd Visit", subtitle: "24–26 wks / 6–6.5 mos" },
    { number: 4, title: "4th Visit", subtitle: "30 wks / 7–7.5 mos" },
    { number: 5, title: "5th Visit", subtitle: "34 wks / 8.5 mos" },
    { number: 6, title: "6th Visit", subtitle: "35 wks / 9 mos" },
    { number: 7, title: "7th Visit", subtitle: "36 wks / 9 mos" },
    { number: 8, title: "8th Visit", subtitle: "37–40 wks" },
];

const monitoringRows = [
    { label: "Date", field: "visit_date" },
    { label: "AOG", field: "aog" },
    { label: "BP", field: "blood_pressure" },
    { label: "Weight", field: "weight" },
    { label: "FH", field: "fundal_height" },
    { label: "FHB", field: "fetal_heart_beat" },
    { label: "PRES", field: "presentation" },
    { label: "MEDICINE GIVEN", field: "medicine_given" },
    { label: "DANGER SIGNS", field: "danger_signs" },
    { label: "HBsAg", field: "hbsag" },
    { label: "HIV / TEST / SCREENING", field: "hiv_screening" },
    { label: "GESTATIONAL DIABETES", field: "gestational_diabetes" },
    { label: "CBC / Hgb & Hct Count", field: "cbc_hgb_hct" },
    { label: "RPR / RDT", field: "rpr_rdt" },
];

const residentRows = [
    { label: "Name", getValue: (record, resident) => resident.full_name },
    { label: "Spouse", getValue: (record) => record.spouse_name },
    { label: "DOB", getValue: (record, resident) => formatDate(resident.date_of_birth) },
    { label: "Age", getValue: (record, resident) => resident.age },
    { label: "Height", getValue: (record) => record.height },
    { label: "Weight", getValue: (record) => record.initial_weight },
    { label: "OB SCORE", getValue: (record) => record.ob_score },
    { label: "LMP", getValue: (record) => formatDate(record.lmp) },
    { label: "EDC", getValue: (record) => formatDate(record.edc) },
    { label: "PUROK", getValue: (record, resident) => resident.sitio_purok },
    { label: "CONTACT NO", getValue: (record, resident) => resident.mobile_no },
    { label: "BMI", getValue: (record) => record.bmi },
    { label: "PAST MEDICAL HX", getValue: (record) => record.past_medical_history },
    { label: "FAMILY HX", getValue: (record) => record.family_history },
    ...[1, 2, 3, 4, 5].map((number) => ({
        label: `TT${number}`,
        getValue: (record) => formatDate(record[`tt${number}_date`]),
    })),
    {
        label: "PREGNANCY OUTCOME",
        getValue: (record) => record.pregnancy_outcome,
    },
];

export default function PrenatalRecordPrintPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadRecord = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await prenatalRecordService.show(id);
            setRecord(response.data.data);
        } catch (err) {
            console.error("Unable to load prenatal record for printing:", err);

            setError(
                err.response?.data?.message ??
                "Unable to load prenatal monitoring record."
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadRecord();
    }, [loadRecord]);

    const visits = record?.visits ?? [];
    const resident = record?.resident ?? {};

    const scheduledVisits = visitColumns.map((column) => ({
        ...column,
        visit: visits.find(
            (visit) => Number(visit.visit_number) === column.number
        ),
    }));

    const unscheduledVisits = visits.filter(
        (visit) => !visit.visit_number
    );

    if (loading) {
        return (
            <PageContainer>
                <p className="p-6 text-sm text-slate-500">
                    Loading prenatal monitoring record...
                </p>
            </PageContainer>
        );
    }

    if (error || !record) {
        return (
            <PageContainer>
                <div className="mb-4">
                    <DefaultButton
                        onClick={() => navigate(-1)}
                        icon={ArrowLeftIcon}
                        size="sm"
                    >
                        Back
                    </DefaultButton>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error || "Prenatal record not found."}
                </div>
            </PageContainer>
        );
    }

    const barangayName =
        record.barangay?.name ??
        resident.barangay?.name ??
        record.barangay_name ??
        record.barangay_id;

    return (
        <PageContainer>
            <div className="print-toolbar mb-4 flex flex-wrap items-center justify-between gap-2">
                <DefaultButton
                    onClick={() => navigate(-1)}
                    icon={ArrowLeftIcon}
                    size="xs"
                >
                    Back
                </DefaultButton>

                <PrimaryButton
                    onClick={() => window.print()}
                    icon={PrinterIcon}
                    size="xs"
                >
                    Print Prenatal Monitoring
                </PrimaryButton>
            </div>

            <div className="prenatal-print-sheet">
                <table className="prenatal-print-table">
                    <colgroup>
                        <col className="resident-column" />
                        {visitColumns.map((column) => (
                            <col key={column.number} className="visit-column" />
                        ))}
                        <col className="remarks-column" />
                    </colgroup>

                    <thead>
                        <tr>
                            <th colSpan={10} className="document-title">
                                PRENATAL MONITORING
                            </th>
                        </tr>

                        <tr className="registration-heading">
                            <th colSpan={3}>
                                Date of Registration:
                                <span>{formatDate(record.registration_date)}</span>
                            </th>

                            <th colSpan={3}>
                                Barangay:
                                <span>{valueOrDash(barangayName)}</span>
                            </th>

                            <th colSpan={4}>
                                Civil Status:
                                <span>{valueOrDash(resident.civil_status)}</span>
                            </th>
                        </tr>

                        <tr className="visit-heading">
                            <th>Name</th>

                            {scheduledVisits.map((column) => (
                                <th key={column.number}>
                                    <strong>{column.title}</strong>
                                    <small>{column.subtitle}</small>
                                </th>
                            ))}

                            <th>Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {monitoringRows.map((row, rowIndex) => (
                            <tr key={row.field}>
                                {rowIndex === 0 && (
                                    <td
                                        rowSpan={monitoringRows.length}
                                        className="resident-details-cell"
                                    >
                                        {residentRows.map((item) => (
                                            <div
                                                key={item.label}
                                                className="resident-detail-row"
                                            >
                                                <strong>{item.label}:</strong>
                                                <span>
                                                    {valueOrDash(
                                                        item.getValue(record, resident)
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </td>
                                )}

                                {scheduledVisits.map((column) => (
                                    <td key={column.number}>
                                        <PrintCell
                                            label={`${row.label}:`}
                                            value={getVisitValue(
                                                column.visit,
                                                row.field
                                            )}
                                        />
                                    </td>
                                ))}

                                {rowIndex === 0 && (
                                    <td
                                        rowSpan={monitoringRows.length}
                                        className="remarks-cell"
                                    >
                                        {valueOrDash(record.remarks)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {unscheduledVisits.length > 0 && (
                    <section className="unscheduled-visits">
                        <h3>Unscheduled Consultations</h3>

                        <table className="unscheduled-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>AOG</th>
                                    <th>BP</th>
                                    <th>Weight</th>
                                    <th>FH</th>
                                    <th>FHB</th>
                                    <th>Presentation</th>
                                    <th>Medicine Given</th>
                                    <th>Danger Signs</th>
                                    <th>Screening / Remarks</th>
                                </tr>
                            </thead>

                            <tbody>
                                {unscheduledVisits.map((visit) => (
                                    <tr key={visit.id}>
                                        <td>{formatDate(visit.visit_date)}</td>
                                        <td>{formatAog(visit)}</td>
                                        <td>{valueOrDash(visit.blood_pressure)}</td>
                                        <td>{valueOrDash(visit.weight)}</td>
                                        <td>{valueOrDash(visit.fundal_height)}</td>
                                        <td>{valueOrDash(visit.fetal_heart_beat)}</td>
                                        <td>{valueOrDash(visit.presentation)}</td>
                                        <td>{valueOrDash(visit.medicine_given)}</td>
                                        <td>{valueOrDash(visit.danger_signs)}</td>
                                        <td>
                                            {[
                                                visit.hbsag,
                                                visit.hiv_screening,
                                                visit.gestational_diabetes,
                                                visit.cbc_hgb_hct,
                                                visit.rpr_rdt,
                                                visit.remarks,
                                            ].filter(Boolean).join(" | ") || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                <div className="print-footer">
                    <span>Generated: {new Date().toLocaleDateString("en-PH")}</span>
                    <span>BOAConnect – Prenatal Monitoring</span>
                </div>
            </div>
        </PageContainer>
    );
}
