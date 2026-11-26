import clsx from "clsx";

export default function DataTableActionButton({
    icon: Icon,
    title,
    label,
    onClick,
    color = "slate",
    disabled = false,
}) {
    const colors = {
        slate: "text-slate-500 hover:text-slate-700",
        green: "text-slate-500 hover:text-green-700",
        red: "text-slate-500 hover:text-red-700",
        yellow: "text-slate-500 hover:text-yellow-600",
        blue: "text-slate-500 hover:text-blue-600",
        indigo: "text-slate-500 hover:text-indigo-600",
    };

    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                "inline-flex items-center justify-center gap-0",
                "rounded-lg p-1.5",
                "transition hover:bg-green-50",
                "disabled:pointer-events-none",
                "disabled:opacity-40",
                "whitespace-nowrap text-sm",
                colors[color]
            )}
        >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}

            {label && <span className="tracking-tighter">{label}</span>}
        </button>
    );
}
