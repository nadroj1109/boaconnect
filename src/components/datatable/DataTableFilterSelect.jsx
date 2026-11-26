import Select from "react-select";

import reactSelectStyles from "../forms/styles/reactSelectStyles";

export default function DataTableFilterSelect({
    label,
    value,
    options = [],
    onChange,
    placeholder = "All",
    isLoading = false,
    isDisabled = false,
    height = "38px",
    getOptionLabel = (option) =>
        option.label ?? option.name,
    getOptionValue = (option) =>
        option.value ?? option.id,
}) {
    const selected =
        options.find(
            (option) =>
                String(getOptionValue(option)) ===
                String(value ?? "")
        ) ?? null;

    return (
        <div className="min-w-0">
            {label && (
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}

            <Select
                options={options}
                value={selected}
                onChange={(option) =>
                    onChange(
                        option
                            ? getOptionValue(option)
                            : ""
                    )
                }
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                placeholder={placeholder}
                isLoading={isLoading}
                isDisabled={isDisabled || isLoading}
                isSearchable
                isClearable
                styles={{
                    ...reactSelectStyles,
                    control: (base, state) => ({
                        ...reactSelectStyles.control(base, state),
                        height,
                        minHeight: height,
                    }),
                }}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                noOptionsMessage={() => "No records found."}
                loadingMessage={() => "Loading..."}
            />
        </div>
    );
}