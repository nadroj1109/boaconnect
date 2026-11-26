export function normalizeResident(resident) {
    const nameFromParts = [
        resident.first_name,
        resident.middle_name,
        resident.last_name,
        resident.ext_name,
    ]
        .filter(Boolean)
        .join(" ");

    const fullName =
        resident.full_name ||
        nameFromParts ||
        resident.name ||
        resident.label ||
        "Unnamed Resident";

    const id = resident.id ?? resident.value ?? null;

    return {
        ...resident,
        id,
        value: id != null ? String(resident.value ?? id) : "",
        label: fullName,
        email:
            resident.email ??
            resident.email_address ??
            "",
        mobile_number:
            resident.mobile_number ??
            resident.mobile_no ??
            "",
    };
}

export function getRoleName(role) {
    return role?.name ?? role?.label ?? "";
}

export function isRoleSelected(selectedRoleIds, roleOptions, roleName) {
    return (selectedRoleIds ?? []).some((selectedId) => {
        const id =
            typeof selectedId === "object" && selectedId !== null
                ? selectedId.value ?? selectedId.id
                : selectedId;

        const option = roleOptions.find(
            (role) =>
                String(role.value ?? role.id) === String(id)
        );

        return getRoleName(option) === roleName;
    });
}

export function isStaffRoleSelected(selectedRoleIds, roles) {
    return isRoleSelected(selectedRoleIds, roles, "Staff");
    // return (selectedRoleIds ?? []).some((selectedId) => {
    //     const role = roles.find(
    //         (item) =>
    //             String(item.value ?? item.id) === String(selectedId)
    //     );

    //     return (role?.name ?? role?.label) === "Staff";
    // });
}