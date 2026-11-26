import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import { DataTable } from "../../components/datatable";

import useChildNutritionMonitorings from "../../hooks/useChildNutritionMonitorings";
import useModal from "../../hooks/useModal";

import { useDialog } from "../../components/dialog";

import ChildNutritionMonitoringModal from "../../components/child-nutrition/ChildNutritionMonitoringModal";

export default function ChildNutritionMonitoringPage() {
    const navigate = useNavigate();

    const {
        childNutritionMonitorings,
        loading,
        pagination,
        table,
        refresh,
        remove,
    } = useChildNutritionMonitorings();
    console.log(childNutritionMonitorings);
    const modal = useModal();
    const dialog = useDialog();

    const [selectedRecord, setSelectedRecord] = useState(null);

    const currentYear = new Date().getFullYear();

    const yearOptions = useMemo(() => {
        return Array.from(
            { length: 6 },
            (_, index) => currentYear - index
        );
    }, [currentYear]);

    function handleCreate() {
        setSelectedRecord(null);
        modal.show();
    }

    function handleEdit(row) {
        setSelectedRecord(row);
        modal.show();
    }

    async function handleDelete(row) {
        const confirmed = await dialog.confirm({
            title: "Delete Monitoring Record",
            message: `Are you sure you want to delete the annual monitoring record for ${row.child_name}?`,
            confirmText: "Delete",
            cancelText: "Cancel",
            variant: "danger",
        });

        if (!confirmed) return;

        try {
            await remove(row.id);
        } catch (error) {
            console.error("Unable to delete monitoring record:", error);
        }
    }

    const rows = useMemo(() => {
        return childNutritionMonitorings.map(record => {
            const resident = record.resident ?? {};

            const childName =
                resident.full_name ??
                [
                    resident.first_name,
                    resident.middle_name,
                    resident.last_name,
                    resident.suffix,
                ]
                    .filter(Boolean)
                    .join(" ");

            return {
                ...record,
                child_name: childName || "Unknown Resident",
                birth_date: resident.date_of_birth,
                age: resident.age,
                gender: resident.sex,
                assessments_label: `${record.assessments_count ?? 0} / 12`,
            };
        });
    }, [childNutritionMonitorings]);

    const columns = [
        // {
        //     key: "monitoring_year",
        //     title: "Year",
        //     sortable: true,
        //     align: "center",
        // },
        {
            key: "sequence_no",
            title: "Sequence No.",
            sortable: true,
            render: row => row.sequence_no ?? "—",
        },
        {
            key: "child_name",
            title: "Child Name",
            sortable: false,
            render: row => (
                <span className="font-medium text-slate-800">
                    {row.child_name}
                </span>
            ),
        },
        {
            key: "gender",
            title: "Gender",
            align: "center",
            render: row => row.gender || "—",
        },
        {
            key: "birthweight",
            title: "Birthweight (kg)",
            align: "center",
        },
        {
            key: "low_birth_weight",
            title: "Low Birth Weight (<2.5kg)",
            type: "boolean",
            align: "center",
        },
        {
            key: "assessments_label",
            title: "Assessments",
            align: "center",
            render: row => (
                <span className="font-medium text-blue-700">
                    {row.assessments_label}
                </span>
            ),
        },
        
    ];

    return (
        <PageContainer>
            <PageHeader
                title="Child Nutrition Monitoring"
                subtitle="Annual growth monitoring of identified children."
            />

            <DataTable
                title="Monitoring Records"
                subtitle="Children registered for annual nutrition monitoring"
                columns={columns}
                rows={rows}
                loading={loading}
                pagination={pagination}
                table={table}
                onRefresh={refresh}
                onCreate={handleCreate}
                onCreateText="Register Child"
                actions={{
                    edit: handleEdit,

                    delete: handleDelete,

                    view: {
                        icon: EyeIcon,
                        title: "View Prenatal Record",
                        label: "View",
                        color: "blue",
                        onClick: (row) =>
                            navigate(`/child-nutrition-monitoring/${row.id}`),
                    },
                }}
                toolbarExtra={
                    <select
                        value={table.filters.monitoring_year ?? ""}
                        onChange={event =>
                            table.updateFilters({
                                monitoring_year: event.target.value,
                            })
                        }
                        className="
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                        "
                    >
                        <option value="">All Years</option>

                        {yearOptions.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                }
            />

            <ChildNutritionMonitoringModal
                open={modal.open}
                onClose={modal.hide}
                monitoringRecord={selectedRecord}
                onSuccess={refresh}
            />
        </PageContainer>
    );
}