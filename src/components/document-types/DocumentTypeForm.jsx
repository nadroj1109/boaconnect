import {
    TextField,
    SwitchField,
    TextAreaField,
    NumberField,
    SelectField,
} from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";
import useAvailableDocumentTemplates from "../../hooks/useAvailableDocumentTemplates";

export default function DocumentTypeForm() {

    const {
        values,
        errors,
        setValue,
    } = useFormContext();

    const {
        templates,
    } = useAvailableDocumentTemplates();

    return (

        <div className="space-y-5">

            {/* Document Information */}
            <FormSection
                title="Document Type Information"
                description="Provide the basic information of the Document Type."
            >

                {/* <TextField
                    label="Code"
                    name="code"
                    value={values.code}
                    error={errors.code}
                    onChange={(e) =>
                        setValue(
                            "code",
                            e.target.value
                        )
                    }
                /> */}

                <TextField
                    label="Name"
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

                <TextField
                    label="Document Title"
                    name="document_title"
                    value={values.document_title}
                    error={errors.document_title}
                    required
                    onChange={(e) =>
                        setValue(
                            "document_title",
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

                <SelectField
                    label="Document Template"
                    name="document_template_id"
                    options={templates}
                    getOptionLabel={(template) =>
                        template.name
                    }
                    getOptionValue={(template) =>
                        String(template.id)
                    }
                    required
                />

            </FormSection>


            {/* Processing Setting */}
            <FormGrid cols={2}>

                <FormSection
                    title="Processing Setting"
                    description="Configure the processing time and standard document fee."
                >

                    <NumberField
                        label="Processing Days"
                        name="processing_days"
                        value={values.processing_days}
                        error={errors.processing_days}
                        min={0}
                        required
                        onChange={(e) =>
                            setValue(
                                "processing_days",
                                e.target.value
                            )
                        }
                    />

                    <FormSection
                        title="Approval"
                        description="Configure document approval requirements."
                    >

                        <SwitchField
                            name="requires_chairperson_signature"
                            trueLabel="Chairperson Signature Required"
                            falseLabel="Chairperson Signature Not Required"
                        />

                    </FormSection>

                </FormSection>

                {/* Payment Settings */}
                <FormSection
                    title="Payment Settings"
                    description="Configure how payment is handled for this document."
                >

                    <SwitchField
                        name="requires_payment"
                        trueLabel="Payment Required"
                        falseLabel="Payment Not Required"
                        onChange={(checked) => {

                            if (!checked) {

                                setValue("fee", "");

                                setValue(
                                    "allow_online_payment",
                                    false
                                );

                            }

                        }}
                    />

                    {values.requires_payment && (
                        <>
                            <NumberField
                                label="Fee"
                                name="fee"
                                value={values.fee}
                                error={errors.fee}
                                min={0}
                                required
                                step="0.01"
                                onChange={(e) =>
                                    setValue(
                                        "fee",
                                        e.target.value
                                    )
                                }
                            />

                            <SwitchField
                                name="allow_online_payment"
                                trueLabel="Online Payment Allowed"
                                falseLabel="Online Payment Not Allowed"
                            />
                        </>
                    )}
                    
                    

                </FormSection>

            </FormGrid>

            {/* Status */}

            <FormSection
                title="Status"
                description="Control whether this document type is currently available."
            >

                <SwitchField
                    name="is_active"
                    trueLabel="Active"
                    falseLabel="Inactive"
                />

            </FormSection>

        </div>

    );

}