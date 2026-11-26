import {
    TextField,
    SwitchField,
} from "../forms";

import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";

export default function EthnicityForm() {

    const {

        values,

        errors,

        setValue,

    } = useFormContext();

    return (

        <div className="space-y-5">

            <FormSection

                title="Ethnicity Information"

                description="Provide the basic information of the ethnicity."

            >
                

            <TextField

                label="Ethnicity"

                name="ethnicity"

                value={values.ethnicity}

                error={errors.ethnicity}

                onChange={(e)=>
                    
                    setValue(
                        
                        "ethnicity",
                        
                        e.target.value
                        
                    )
                    
                }

                />

            </FormSection>

            <FormSection

                title="Status"

                description="Enable or disable this ethnicity."

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