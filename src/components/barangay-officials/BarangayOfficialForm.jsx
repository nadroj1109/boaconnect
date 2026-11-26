import {
    SelectField,
    TextField,
    SwitchField,
} from "../forms";

import FormSection
    from "../forms/FormSection";

import useFormContext
    from "../../hooks/useFormContext";


export default function BarangayOfficialForm({

    barangays = [],

    residents = [],

    officialPositions = [],

    residentsLoading = false,

}) {

    const {

        values,

        errors,

        setValue,

    } = useFormContext();


    function handleBarangayChange(e) {

        const barangayId =
            e.target.value;


        setValue(

            "barangay_id",

            barangayId

        );


        setValue(

            "resident_id",

            ""

        );

    }

    return (

        <div className="space-y-5">

            <FormSection

                title="Official Information"

                description={
                    "Select the barangay, resident, and official position."
                }

            >

                <SelectField

                    label="Barangay"

                    name="barangay_id"

                    value={
                        values.barangay_id
                    }

                    error={
                        errors.barangay_id
                    }

                    onChange={
                        handleBarangayChange
                    }

                    options={
                        barangays
                    }

                    optionValue="id"

                    optionLabel="name"

                    placeholder="Select barangay"

                />


                <SelectField

                    label="Resident"

                    name="resident_id"

                    value={values.resident_id}

                    error={errors.resident_id}

                    onChange={(e) =>
                        setValue(
                            "resident_id",
                            e.target.value
                        )
                    }

                    options={residents}

                    placeholder={
                        !values.barangay_id
                            ? "Select barangay first"
                            : residentsLoading
                                ? "Loading residents..."
                                : "Select resident"
                    }

                    disabled={
                        !values.barangay_id ||
                        residentsLoading
                    }

                />


                <SelectField

                    label="Official Position"

                    name="official_position_id"

                    value={
                        values.official_position_id
                    }

                    error={
                        errors.official_position_id
                    }

                    onChange={(e) =>

                        setValue(

                            "official_position_id",

                            e.target.value

                        )

                    }

                    options={
                        officialPositions
                    }

                    optionValue="id"

                    optionLabel="name"

                    placeholder="Select official position"

                />

            </FormSection>


            <FormSection

                title="Term"

                description={
                    "Specify the official's term of office."
                }

            >

                <TextField

                    label="Term Start"

                    name="term_start"

                    type="date"

                    value={
                        values.term_start
                    }

                    error={
                        errors.term_start
                    }

                    onChange={(e) =>

                        setValue(

                            "term_start",

                            e.target.value

                        )

                    }

                />


                <TextField

                    label="Term End"

                    name="term_end"

                    type="date"

                    value={
                        values.term_end
                    }

                    error={
                        errors.term_end
                    }

                    onChange={(e) =>

                        setValue(

                            "term_end",

                            e.target.value

                        )

                    }

                />

            </FormSection>


            <FormSection

                title="Status"

                description={
                    "Enable or disable this barangay official."
                }

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