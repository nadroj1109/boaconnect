import {
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import {
    TextField,
    TextAreaField,
    SelectField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import ModalBody from "../modal/ModalBody";
import ModalFooter from "../modal/ModalFooter";

import useFormContext from "../../hooks/useFormContext";

import {
    DefaultButton,
    PrimaryButton,
} from "../button";


export default function ComplaintWorkflowModal({

    title,

    action,

    loading = false,

    officials = [],
    officialsLoading = false,

    onSubmit,

    onCancel,

}) {

    const form =
        useFormContext();


    function submit(e) {

        e.preventDefault();

        onSubmit();

    }


    function renderFields() {

        switch (action) {

            /*
             * REVIEW
             */

            case "review":

                return (

                    <FormGrid columns={1}>

                        <TextAreaField
                            name="remarks"
                            label="Remarks"
                            rows={4}
                        />

                    </FormGrid>

                );


            /*
             * ASSIGN
             */

            case "assign":

                return (

                    <>

                        <FormGrid columns={1}>

                            <SelectField
                                name="assigned_to"
                                label="Assign To"
                                options={officials}
                                required
                            />

                        </FormGrid>


                        <FormGrid columns={1}>

                            <TextAreaField
                                name="remarks"
                                label="Remarks"
                                rows={4}
                            />

                        </FormGrid>

                    </>

                );


            /*
             * SCHEDULE / RESCHEDULE HEARING
             */

            case "schedule_hearing":

            case "reschedule_hearing":

                return (

                    <>

                        <FormGrid columns={2}>

                            <TextField
                                name="hearing_date"
                                label="Hearing Date"
                                type="date"
                                required
                            />

                            <TextField
                                name="hearing_time"
                                label="Hearing Time"
                                type="time"
                                required
                            />

                        </FormGrid>


                        <FormGrid columns={1}>

                            <TextField
                                name="location"
                                label="Location"
                                required
                            />

                        </FormGrid>


                        <FormGrid columns={1}>

                            <TextAreaField
                                name="remarks"
                                label="Remarks"
                                rows={4}
                            />

                        </FormGrid>

                    </>

                );


            /*
             * START HEARING
             */

            case "start_hearing":

                return (

                    <FormGrid columns={1}>

                        <TextAreaField
                            name="remarks"
                            label="Remarks"
                            rows={4}
                        />

                    </FormGrid>

                );


            /*
             * RESOLVE
             */

            case "resolve":

                return (

                    <>

                        <FormGrid columns={1}>

                            <TextAreaField
                                name="resolution"
                                label="Resolution"
                                rows={5}
                                required
                            />

                        </FormGrid>


                        <FormGrid columns={1}>

                            <TextAreaField
                                name="remarks"
                                label="Remarks"
                                rows={4}
                            />

                        </FormGrid>

                    </>

                );


            /*
             * COMPLETE / CANCEL HEARING
             */

            case "complete_hearing":

            case "cancel_hearing":

                return (

                    <FormGrid columns={1}>

                        <TextAreaField
                            name="remarks"
                            label="Remarks"
                            rows={4}
                        />

                    </FormGrid>

                );


            /*
             * CLOSE / REJECT / CANCEL COMPLAINT
             */

            case "close":

            case "reject":

            case "cancel":

                return (

                    <FormGrid columns={1}>

                        <TextAreaField
                            name="remarks"
                            label="Remarks"
                            rows={4}
                        />

                    </FormGrid>

                );


            default:

                return null;

        }

    }


    return (

        <Modal

            open={true}

            onClose={onCancel}

            loading={loading}

            size="md"

        >

            <ModalHeader

                title={title}

                onClose={onCancel}

                loading={loading}

            />


            <form onSubmit={submit}>

                <ModalBody>

                    <FormSection
                        title="ACTION DETAILS"
                    >

                        {renderFields()}

                    </FormSection>

                </ModalBody>


                <ModalFooter>

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
                        Confirm
                    </PrimaryButton>

                </ModalFooter>

            </form>

        </Modal>

    );

}