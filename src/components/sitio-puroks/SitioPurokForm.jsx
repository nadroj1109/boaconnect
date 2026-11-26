import {
    TextField,
    SwitchField,
} from "../forms";

import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";

export default function SitioPurokForm() {

    const {

        values,

        errors,

        setValue,

    } = useFormContext();

    return (

        <div className="space-y-5">

            <FormSection

                title="Sitio/Purok/Zone Information"

                description="Provide the basic information of the sitio/purok/zone."

            >
                

            <TextField

                label="Sito/Purok/Zone"

                name="sitio_purok"

                value={values.sitio_purok}

                error={errors.sitio_purok}

                onChange={(e)=>
                    
                    setValue(
                        
                        "sitio_purok",
                        
                        e.target.value
                        
                    )
                    
                }

                />

            </FormSection>

            <FormSection

                title="Status"

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