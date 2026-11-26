import {
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import {
    TextField,
    SelectField,
    TextAreaField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import useFormContext
    from "../../hooks/useFormContext";

import {
    DefaultButton,
    PrimaryButton,
} from "../button";


const STATUS_OPTIONS = [
    {
        value: "submitted",
        label: "Submitted",
    },
    {
        value: "under_review",
        label: "Under Review",
    },
    {
        value: "assigned",
        label: "Assigned",
    },
    {
        value: "scheduled",
        label: "Scheduled",
    },
    {
        value: "hearing",
        label: "Hearing",
    },
    {
        value: "resolved",
        label: "Resolved",
    },
    {
        value: "closed",
        label: "Closed",
    },
    {
        value: "rejected",
        label: "Rejected",
    },
    {
        value: "cancelled",
        label: "Cancelled",
    },
];


export default function HistoricalComplaintForm({

    residents = [],

    complaintTypes = [],

    users = [],

    loading = false,

    onSubmit,

    onCancel,

}) {

    const form =
        useFormContext();


    function submit(e) {

        e.preventDefault();

        onSubmit();

    }


    return (

        <form
            onSubmit={submit}
            className="space-y-8"
        >

            <FormSection title="HISTORICAL COMPLAINT INFORMATION">

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
                    />

                </FormGrid>


                <FormGrid columns={2}>

                    <SelectField
                        name="complaint_type_id"
                        label="Complaint Type"
                        options={complaintTypes}
                        required
                    />

                    <TextField
                        name="complaint_no"
                        label="Complaint No."
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


            <FormSection title="HISTORICAL STATUS">

                <FormGrid columns={2}>

                    <SelectField
                        name="status"
                        label="Final Status"
                        options={
                            STATUS_OPTIONS
                        }
                        required
                    />

                    <SelectField
                        name="assigned_to"
                        label="Assigned To"
                        options={users}
                    />

                </FormGrid>


                <FormGrid columns={1}>

                    <TextAreaField
                        name="resolution"
                        label="Resolution"
                        rows={4}
                    />

                </FormGrid>


                <FormGrid columns={2}>

                    <TextField
                        name="resolved_at"
                        label="Resolved At"
                        type="datetime-local"
                    />

                    <TextField
                        name="closed_at"
                        label="Closed At"
                        type="datetime-local"
                    />

                </FormGrid>

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
                        Create Historical Complaint
                    </PrimaryButton>

                </div>

            </FormActions>

        </form>

    );

}