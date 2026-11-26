import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    LockClosedIcon,
    LockOpenIcon,
    KeyIcon,
    CheckIcon,
    XMarkIcon,
    DocumentArrowDownIcon,
    ArchiveBoxIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";

import DataTableActionButton from "./DataTableActionButton";

export default function DataTableActions({
    row,
    actions = {},
}) {
    function isVisible(action) {
        if (!action) return false;

        if (typeof action === "function") {
            return true;
        }

        return action.visible
            ? action.visible(row)
            : true;
    }

    function handleAction(action) {
        if (typeof action === "function") {
            action(row);
            return;
        }

        action?.onClick?.(row);
    }

    const builtInActions = {
        edit: {
            icon: PencilSquareIcon,
            title: "Edit",
            color: "green",
        },
        status: {
            icon: row.is_active
                ? LockClosedIcon
                : LockOpenIcon,
            title: row.is_active
                ? "Deactivate"
                : "Activate",
            color: "yellow",
        },
        password: {
            icon: KeyIcon,
            title: "Reset Password",
            color: "indigo",
        },
        delete: {
            icon: TrashIcon,
            title: "Delete",
            color: "red",
        },
        view: {
            icon: EyeIcon,
            title: "View",
            color: "blue",
        },
        approve: {
            icon: CheckIcon,
            title: "Approve",
            color: "green",
        },
        reject: {
            icon: XMarkIcon,
            title: "Reject",
            color: "red",
        },
        generate: {
            icon: DocumentArrowDownIcon,
            title: "Generate",
            color: "blue",
        },
        release: {
            icon: ArchiveBoxIcon,
            title: "Release",
            color: "green",
        },
        requirements: {
            icon: ListBulletIcon,
            title: "Requirements",
            color: "indigo",
        },
    };

    const dynamicActions = Object.entries(actions)
        .filter(([key]) => !builtInActions[key]);

    function renderAction(key, config, action) {
        if (!isVisible(action)) return null;

        const options =
            typeof action === "object" ? action : {};

        return (
            <DataTableActionButton
                key={key}
                icon={options.icon ?? config.icon}
                title={options.title ?? config.title ?? key}
                label={options.label}
                color={options.color ?? config.color ?? "blue"}
                disabled={options.disabled ?? false}
                onClick={() => handleAction(action)}
            />
        );
    }

    return (
        <div className="flex items-center justify-center gap-1">
            {Object.entries(actions).map(([key, action]) => {
                if (builtInActions[key]) {
                    return renderAction(
                        key,
                        builtInActions[key],
                        action
                    );
                }

                // Keep existing dynamicActions support.
                const dynamicAction = dynamicActions.find(
                    ([dynamicKey]) => dynamicKey === key
                );

                if (!dynamicAction) return null;

                const [, dynamicConfig] = dynamicAction;

                if (typeof dynamicConfig === "function") {
                    return null;
                }

                if (!dynamicConfig?.icon) {
                    return null;
                }

                return renderAction(key, {}, dynamicConfig);
            })}
        </div>
    );
}
