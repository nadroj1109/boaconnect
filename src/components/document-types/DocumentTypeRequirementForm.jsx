import {
    TextField,
    TextAreaField,
    NumberField,
    SwitchField,
} from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

import useFormContext
    from "../../hooks/useFormContext";

export default function DocumentTypeRequirementForm() {

    const {
        values,
        errors,
        setValue,
    } = useFormContext();

    return (

        <div className="space-y-5">

            <FormSection
                title="Requirement Information"
                description="Specify the document or information that the resident must provide."
            >

                <TextField
                    label="Requirement Name"
                    name="name"
                    value={values.name}
                    error={errors.name}
                    required
                    onChange={(e) =>
                        setValue(
                            "name",
                            e.target.value
                        )
                    }
                />

                <TextAreaField
                    label="Description"
                    name="description"
                    value={values.description}
                    error={errors.description}
                    rows={3}
                    onChange={(e) =>
                        setValue(
                            "description",
                            e.target.value
                        )
                    }
                />

            </FormSection>

            <FormGrid cols={2}>

                <FormSection
                    title="File Settings"
                    description="Configure the file types and maximum upload size."
                >

                    <TextField
                        label="Allowed File Types"
                        name="allowed_file_types"
                        value={
                            values.allowed_file_types
                        }
                        error={
                            errors.allowed_file_types
                        }
                        placeholder="pdf,jpg,jpeg,png"
                        onChange={(e) =>
                            setValue(
                                "allowed_file_types",
                                e.target.value
                            )
                        }
                    />

                    <NumberField
                        label="Maximum File Size (KB)"
                        name="max_file_size"
                        value={
                            values.max_file_size
                        }
                        error={
                            errors.max_file_size
                        }
                        min={1}
                        placeholder="10240"
                        onChange={(e) =>
                            setValue(
                                "max_file_size",
                                e.target.value
                            )
                        }
                    />

                </FormSection>

                <FormSection
                    title="Requirement Settings"
                    description="Configure whether the requirement must be submitted."
                >

                    <NumberField
                        label="Sort Order"
                        name="sort_order"
                        value={
                            values.sort_order
                        }
                        error={
                            errors.sort_order
                        }
                        min={0}
                        required
                        onChange={(e) =>
                            setValue(
                                "sort_order",
                                e.target.value
                            )
                        }
                    />

                    <SwitchField
                        name="is_required"
                        trueLabel="Required"
                        falseLabel="Optional"
                    />

                    <SwitchField
                        name="is_active"
                        trueLabel="Active"
                        falseLabel="Inactive"
                    />

                </FormSection>

            </FormGrid>

        </div>

    );

}