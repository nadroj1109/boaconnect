import BaseChoice from "./base/BaseChoice";

export default function RadioField({

    options=[],

    direction,

    ...props

}){

    return(

        <BaseChoice

            {...props}

        >

            {(field)=>(

                <div className={
                    direction === "horizontal"
                        ? "flex flex-wrap gap-6"
                        : "space-y-2"
                }>

                    {

                        options.map(option=>(

                            <label

                                key={option.value}

                                className="flex items-center gap-2"

                            >

                                <input

                                    type="radio"

                                    checked={

                                        field.value===option.value

                                    }

                                    onChange={()=>

                                        field.setValue(

                                            option.value

                                        )

                                    }

                                />

                                {option.name}

                            </label>

                        ))

                    }

                </div>

            )}

        </BaseChoice>

    );

}