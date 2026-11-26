import {
    TextField,
    SwitchField,
} from "../forms";

import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";

export default function BarangayForm() {

    const {

        values,

        errors,

        setValue,

    } = useFormContext();

    return (

        <div className="space-y-5">

            <FormSection

                title="Barangay Information"

                description="Provide the basic information of the barangay."

            >
                

            <TextField

                label="Barangay"

                name="barangay"

                value={values.barangay}

                error={errors.barangay}

                onChange={(e)=>
                    
                    setValue(
                        
                        "barangay",
                        
                        e.target.value
                        
                    )
                    
                }

                />

            </FormSection>

            <FormSection

                title="Status"

                description="Enable or disable this barangay."

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