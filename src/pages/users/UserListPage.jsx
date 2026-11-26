import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable, DataTableFilterSelect } from "../../components/datatable";

import useOptions from "../../hooks/useOptions";
import useUsers from "../../hooks/useUsers";
import { useDialog } from "../../components/dialog";
import { notify } from "../../notifications";

export default function UserListPage() {

    const navigate = useNavigate();
    const dialog = useDialog();

    const { roles, loading: loadingRoles } = useOptions({
        only: ["roles"],
    });

    const roleOptions = useMemo(
        () => [
            { value: "", name: "All Roles" },
            ...roles,
        ],
        [roles]
    );

    const {
        users,
        loading,
        pagination,
        table,
        refresh,
        remove,
        toggleStatus,
        resetPassword,
    } = useUsers();

    async function confirmDelete(user) {

        await dialog.confirm({

            title: "Delete User",

            message:
                `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,

            action: () => remove(user.id),

            loading: "Deleting user...",

            success: "User deleted successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to delete user.",

        });

    }

    async function confirmStatus(user) {

        const activating =
            !user.is_active;

        await dialog.confirm({

            title: activating
                ? "Activate User"
                : "Deactivate User",

            message: activating
                ? `Activate "${user.name}"?`
                : `Deactivate "${user.name}"?`,

            confirmText: activating
                ? "Activate"
                : "Deactivate",

            confirmColor: activating
                ? "green"
                : "amber",

            action: () =>
                toggleStatus(user.id),

            loading: "Updating user...",

            success:
                "User status updated successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to update user status.",

        });

    }

    async function confirmResetPassword(user) {

        dialog.confirm({

            title: "Reset Password",

            message:
                `Reset password for "${user.name}"?`,

            confirmText: "Reset",

            confirmColor: "blue",

            onConfirm: () =>
                notify.update({

                    promise:
                        resetPassword(user.id),

                    entity: "Password",

                }),

        });

    }

    const toolbarExtra = (
        <div className="w-full min-w-0 sm:w-64">
            <DataTableFilterSelect
                value={table.filters.role_id ?? ""}
                options={roleOptions}
                placeholder="All Roles"
                height="38px"
                isLoading={loadingRoles}
                onChange={(value) =>
                    table.updateFilters({
                        role_id: value,
                    })
                }
            />
        </div>
    );

    const columns = [

        {
            key: "name",

            title: "Name",

            sortable: true,
        },

        {
            key: "email",

            title: "Email",

            sortable: true,
        },

        {
            key: "barangay_name",

            title: "Barangay",

            sortable: true,

            render: (row) =>
                row.barangay_name || "-",
        },

        {
            key: "official_position",

            title: "Position",

            render: (row) =>
                row.official_position?.name ||
                "-",
        },

        {
            key: "roles",

            title: "Role",

            render: (row) =>
                row.roles?.length
                    ? row.roles.join(", ")
                    : "-",
        },

        {
            key: "is_active",

            title: "Status",

            sortable: true,

            type: "status",
        },

    ];

    return (

        <PageContainer>

            <PageHeader />

            <DataTable

                columns={columns}

                rows={users}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={() =>
                    navigate(
                        "/users/create"
                    )
                }

                actions={{

                    edit: (row) =>
                        navigate(
                            `/users/${row.id}/edit`
                        ),

                    delete: (row) =>
                        confirmDelete(row),

                    status: (row) =>
                        confirmStatus(row),

                    // password: (row) =>
                    //     confirmResetPassword(row),

                }}

                toolbarExtra={toolbarExtra}

            />

        </PageContainer>

    );

}