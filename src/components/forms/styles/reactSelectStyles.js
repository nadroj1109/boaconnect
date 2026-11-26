const reactSelectStyles = {

    control: (base, state) => ({

        ...base,

        minHeight: "44px",

        borderRadius: "0.5rem",

        borderColor: state.isFocused
            ? "#15803d"      // green-700
            : "#CBD5E1",     // slate-300

        boxShadow: state.isFocused
            ? "0 0 0 3px rgba(22,163,74,.15)"
            : "none",

        "&:hover": {

            borderColor: "#15803d",

        },

        backgroundColor: state.isDisabled

            ? "#F8FAFC"

            : "#FFFFFF",

        cursor: state.isDisabled

            ? "not-allowed"

            : "pointer",

        transition: "all .2s ease",

    }),

    valueContainer: (base) => ({

        ...base,

        padding: "2px 12px",

    }),

    input: (base) => ({

        ...base,

        color: "#0F172A",

    }),

    placeholder: (base) => ({

        ...base,

        color: "#94A3B8",

    }),

    singleValue: (base) => ({

        ...base,

        color: "#0F172A",

    }),

    menu: (base) => ({

        ...base,

        borderRadius: "0.75rem",

        overflow: "hidden",

        zIndex: 9999,

    }),

    menuPortal: (base) => ({

        ...base,

        zIndex: 9999,

    }),

    option: (base, state) => ({

        ...base,

        backgroundColor: state.isSelected

            ? "#15803d"

            : state.isFocused

                ? "#DCFCE7"

                : "#FFFFFF",

        color: state.isSelected

            ? "#FFFFFF"

            : "#0F172A",

        cursor: "pointer",

    }),

    multiValue: (base) => ({

        ...base,

        backgroundColor: "#DCFCE7",

        borderRadius: "9999px",

    }),

    multiValueLabel: (base) => ({

        ...base,

        color: "#166534",

        fontWeight: 500,

    }),

    multiValueRemove: (base) => ({

        ...base,

        color: "#166534",

        ":hover": {

            backgroundColor: "#15803d",

            color: "#FFFFFF",

        },

    }),

    indicatorSeparator: () => ({

        display: "none",

    }),

    dropdownIndicator: (base, state) => ({

        ...base,

        color: state.isFocused

            ? "#15803d"

            : "#64748B",

        ":hover": {

            color: "#15803d",

        },

    }),

    clearIndicator: (base) => ({

        ...base,

        color: "#64748B",

        ":hover": {

            color: "#DC2626",

        },

    }),

};

export default reactSelectStyles;