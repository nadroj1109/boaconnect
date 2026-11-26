// components/forms/base/BaseUpload.jsx

import { useDropzone } from "react-dropzone";

import BaseField from "./BaseField";
import FieldWrapper from "./FieldWrapper";

export default function BaseUpload({

    name,

    label,

    hint,

    required,

    accept,

    multiple=false,

    children,

}){

    return(

        <BaseField name={name}>

            {(field)=>{

                const {

                    getRootProps,

                    getInputProps,

                    isDragActive,

                }=useDropzone({

                    multiple,

                    accept,

                    onDrop:(files)=>{

                        field.setValue(

                            multiple

                                ? files

                                : files[0]

                        );

                    }

                });

                return(

                    <FieldWrapper

                        label={label}

                        hint={hint}

                        required={required}

                        error={field.error}

                    >

                        {

                            children

                                ? children({

                                    field,

                                    getRootProps,

                                    getInputProps,

                                    isDragActive,

                                })

                                : null

                        }

                    </FieldWrapper>

                );

            }}

        </BaseField>

    );

}