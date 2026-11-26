import { useState } from "react";

import {
    CheckIcon,
    XMarkIcon,
    PaperClipIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    TextField,
    SelectField,
    TextAreaField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import useFormContext from "../../hooks/useFormContext";

import {
    DefaultButton,
    PrimaryButton,
} from "../button";


export default function ComplaintForm({

    residents = [],

    complaintTypes = [],

    loading = false,

    isEdit = false,

    onSubmit,

    onCancel,

}) {

    const form = useFormContext();

    const [attachments, setAttachments] = useState([]);


    function handleAttachmentChange(event) {

        const files = Array.from(
            event.target.files ?? []
        );

        setAttachments(prev => [
            ...prev,
            ...files,
        ]);

        event.target.value = "";

    }


    function removeAttachment(index) {

        setAttachments(prev =>
            prev.filter(
                (_, fileIndex) =>
                    fileIndex !== index
            )
        );

    }


    function submit(event) {

        event.preventDefault();

        onSubmit(attachments);

    }


    return (

        <form
            onSubmit={submit}
            className="space-y-8"
        >

            <FormSection title="COMPLAINT INFORMATION">

                <FormGrid columns={2}>

                    <SelectField
                        name="resident_id"
                        label="Complainant"
                        options={residents}
                        required
                    />

                    <SelectField
                        name="respondent_id"
                        label="Respondent"
                        options={residents}
                        required
                    />

                </FormGrid>


                <FormGrid columns={1}>

                    <SelectField
                        name="complaint_type_id"
                        label="Complaint Type"
                        options={complaintTypes}
                        required
                    />

                </FormGrid>


                <FormGrid columns={1}>

                    <TextField
                        name="subject"
                        label="Subject"
                        required
                    />

                </FormGrid>


                <FormGrid columns={1}>

                    <TextAreaField
                        name="description"
                        label="Description"
                        rows={5}
                        required
                    />

                </FormGrid>

            </FormSection>


            <FormSection title="INCIDENT INFORMATION">

                <FormGrid columns={2}>

                    <TextField
                        name="incident_date"
                        label="Incident Date"
                        type="date"
                        required
                    />

                    <TextField
                        name="incident_time"
                        label="Incident Time"
                        type="time"
                    />

                </FormGrid>


                <FormGrid columns={1}>

                    <TextField
                        name="incident_location"
                        label="Incident Location"
                    />

                </FormGrid>

            </FormSection>


            <FormSection title="ATTACHMENTS">

                <div className="space-y-4">

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                            "
                        >
                            Attach Files
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="
                                .pdf,
                                .jpg,
                                .jpeg,
                                .png,
                                .doc,
                                .docx
                            "
                            onChange={
                                handleAttachmentChange
                            }
                            disabled={loading}
                            className="
                                mt-2
                                block
                                w-full
                                rounded-lg
                                border
                                border-slate-300
                                bg-white
                                text-sm
                                text-slate-700
                                file:mr-4
                                file:border-0
                                file:bg-slate-100
                                file:px-4
                                file:py-2
                                file:text-sm
                                file:font-medium
                                hover:file:bg-slate-200
                            "
                        />

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            PDF, JPG, JPEG, PNG, DOC,
                            or DOCX. Maximum size:
                            10 MB per file.
                        </p>

                    </div>


                    {attachments.length > 0 && (

                        <div className="space-y-2">

                            {attachments.map(
                                (file, index) => (

                                    <div
                                        key={`${file.name}-${index}`}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-3
                                            py-2
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                min-w-0
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <PaperClipIcon
                                                className="
                                                    h-5
                                                    w-5
                                                    shrink-0
                                                    text-slate-500
                                                "
                                            />

                                            <div className="min-w-0">

                                                <p
                                                    className="
                                                        truncate
                                                        text-sm
                                                        font-medium
                                                        text-slate-700
                                                    "
                                                >
                                                    {file.name}
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-slate-500
                                                    "
                                                >
                                                    {
                                                        (
                                                            file.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)
                                                    } MB
                                                </p>

                                            </div>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeAttachment(
                                                    index
                                                )
                                            }
                                            disabled={loading}
                                            className="
                                                shrink-0
                                                rounded
                                                p-1
                                                text-slate-400
                                                hover:bg-slate-200
                                                hover:text-red-600
                                            "
                                            title="Remove"
                                        >

                                            <XCircleIcon
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />

                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </FormSection>


            <FormActions justify="end">

                <div className="flex gap-3">

                    <DefaultButton
                        type="button"
                        icon={XMarkIcon}
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </DefaultButton>


                    <PrimaryButton
                        type="submit"
                        icon={CheckIcon}
                        loading={loading}
                    >
                        {isEdit
                            ? "Update Complaint"
                            : "Create Complaint"
                        }
                    </PrimaryButton>

                </div>

            </FormActions>

        </form>

    );

}