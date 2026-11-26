import {
    TextField,
    TextAreaField,
    SelectField,
    NumberField,
    RadioField,
} from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

import useFormContext
    from "../../hooks/useFormContext";

export default function DocumentTypeFieldForm() {

    const form = useFormContext();

    const fieldTypeOptions = [
        {
            value: "text",
            label: "Text",
        },
        {
            value: "textarea",
            label: "Textarea",
        },
        {
            value: "number",
            label: "Number",
        },
        {
            value: "date",
            label: "Date",
        },
        {
            value: "select",
            label: "Select",
        },
        {
            value: "radio",
            label: "Radio",
        },
        {
            value: "checkbox",
            label: "Checkbox",
        },
    ];

    const optionSourceOptions = [
        {
            value: "",
            label: "Manual Options",
        },
        {
            value: "barangays",
            label: "Barangays",
        },
    ];

    const hasOptions =
        [
            "select",
            "radio",
            "checkbox",
        ].includes(
            form.values.field_type
        );

    function addOption() {

        const options =
            form.values.options ?? [];

        form.setValue(
            "options",
            [
                ...options,
                "",
            ]
        );

    }

    function removeOption(index) {

        const options = [
            ...(form.values.options ?? []),
        ];

        options.splice(
            index,
            1
        );

        form.setValue(
            "options",
            options
        );

    }

    function handleFieldTypeChange(value) {

        form.setValue(
            "field_type",
            value
        );

        if (
            ![
                "select",
                "radio",
                "checkbox",
            ].includes(value)
        ) {

            form.setValue(
                "options",
                []
            );

            form.setValue(
                "option_source",
                null
            );

        }

    }

    function handleOptionSourceChange(value) {

        const optionSource = value || null;

        form.setValue(
            "option_source",
            optionSource
        );

        form.setValue(
            "options",
            optionSource
                ? []
                : [""]
        );
    }

    return (
        <div className="space-y-6">

            <FormSection
                title="FIELD INFORMATION"
            >

                <div>
                    <TextField
                        name="name"
                        label="Field Name"
                        required
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        The name shown to the requester
                        when filling out this field.
                    </p>
                </div>

                <div>
                    <TextField
                        name="field_key"
                        label="Field Key"
                        required
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Unique key used by document templates.
                        Example:{" "}
                        <code className="rounded bg-gray-100 px-1">
                            business_name
                        </code>
                    </p>
                </div>

                <div>
                    <TextAreaField
                        name="description"
                        label="Description"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Optional explanation that helps the
                        requester understand what information
                        to provide.
                    </p>
                </div>

                <div>
                    <SelectField
                        name="field_type"
                        label="Field Type"
                        options={fieldTypeOptions}
                        required
                        onChange={
                            handleFieldTypeChange
                        }
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Determines how this field will be
                        displayed when requesting the document.
                    </p>
                </div>

            </FormSection>

            {hasOptions && (

                <FormSection
                    title="FIELD OPTIONS"
                >

                    <div>
                        <SelectField
                            name="option_source"
                            label="Option Source"
                            options={[
                                {
                                    value: "",
                                    label: "Manual Options",
                                },
                                {
                                    value: "barangays",
                                    label: "Barangays",
                                },
                            ]}
                            onChange={handleOptionSourceChange}
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Choose Manual Options to define the
                            choices yourself, or select a system
                            source to load choices automatically.
                        </p>
                    </div>

                    {form.values.option_source === "barangays" ? (

                        <div
                            className="
                                rounded-md
                                border
                                border-blue-200
                                bg-blue-50
                                p-3
                                text-sm
                                text-blue-700
                            "
                        >
                            Barangay options will be loaded
                            automatically from the system's
                            Barangay records.
                        </div>

                    ) : (

                        <>

                            <div
                                className="
                                    rounded-md
                                    border
                                    border-blue-200
                                    bg-blue-50
                                    p-3
                                    text-sm
                                    text-blue-700
                                "
                            >
                                Add the choices that
                                requesters can select.
                            </div>

                            <div className="space-y-3">

                                {(
                                    form.values.options ?? []
                                ).map(
                                    (
                                        option,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                flex
                                                items-end
                                                gap-2
                                            "
                                        >

                                            <div className="flex-1">

                                                <TextField
                                                    name={`options.${index}`}
                                                    label={`Option ${index + 1}`}
                                                    required
                                                />

                                                {index === 0 && (
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Value that will
                                                        be available to
                                                        the requester.
                                                    </p>
                                                )}

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeOption(
                                                        index
                                                    )
                                                }
                                                className="
                                                    mb-1
                                                    rounded-md
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    text-red-600
                                                    hover:bg-red-50
                                                "
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                            <button
                                type="button"
                                onClick={addOption}
                                className="
                                    rounded-md
                                    border
                                    border-blue-300
                                    bg-white
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-blue-700
                                    hover:bg-blue-50
                                "
                            >
                                Add Option
                            </button>

                        </>

                    )}

                </FormSection>

            )}

            <FormSection
                title="FIELD SETTINGS"
            >

                <FormGrid columns={2}>

                    <div>
                        <RadioField
                            name="is_required"
                            label="Required?"
                            options={[
                                {
                                    value: true,
                                    label: "Yes",
                                },
                                {
                                    value: false,
                                    label: "No",
                                },
                            ]}
                            direction="horizontal"
                            required
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Determines whether the requester
                            must provide this information.
                        </p>
                    </div>

                    <div>
                        <RadioField
                            name="is_active"
                            label="Active?"
                            options={[
                                {
                                    value: true,
                                    label: "Yes",
                                },
                                {
                                    value: false,
                                    label: "No",
                                },
                            ]}
                            direction="horizontal"
                            required
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Inactive fields are not shown when
                            requesting this document.
                        </p>
                    </div>

                </FormGrid>

                <div>
                    <NumberField
                        name="sort_order"
                        label="Sort Order"
                        min={0}
                        step={1}
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Controls the order in which fields
                        appear on the document request form.
                    </p>
                </div>

            </FormSection>

        </div>
    );
}