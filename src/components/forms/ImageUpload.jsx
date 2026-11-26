import BaseUpload from "./base/BaseUpload";

export default function ImageUpload(props){

    return(

        <BaseUpload

            {...props}

            accept={{

                "image/*":[]

            }}

        >

            {({

                field,

                getRootProps,

                getInputProps,

            })=>(

                <div

                    {...getRootProps()}

                    className="rounded-lg border-2 border-dashed p-8"

                >

                    <input

                        {...getInputProps()}

                    />

                    {

                        field.value && (

                            <img

                                src={

                                    URL.createObjectURL(

                                        field.value

                                    )

                                }

                                className="mx-auto h-40 rounded"

                            />

                        )

                    }

                </div>

            )}

        </BaseUpload>

    );

}