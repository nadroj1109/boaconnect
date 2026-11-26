import BaseUpload from "./base/BaseUpload";

export default function FileUpload(props){

    return(

        <BaseUpload

            {...props}

        >

            {({

                field,

                getRootProps,

                getInputProps,

                isDragActive,

            })=>(

                <div

                    {...getRootProps()}

                    className="rounded-lg border-2 border-dashed p-8 text-center"

                >

                    <input

                        {...getInputProps()}

                    />

                    {

                        field.value

                            ? field.value.name

                            : "Drop file here"

                    }

                </div>

            )}

        </BaseUpload>

    );

}