import BaseChoice from "./base/BaseChoice";

export default function CheckboxGroupField({

    options = [],

    direction = "vertical",

    ...

    props

}) {

    return (

        <BaseChoice {...props}>

            {(field) => {

                const values = Array.isArray(field.value)
                    ? field.value
                    : [];

                function toggle(value) {

                    if (values.includes(value)) {

                        field.setValue(

                            values.filter(v => v !== value)

                        );

                    } else {

                        field.setValue([

                            ...values,

                            value,

                        ]);

                    }

                }

                return (

                    <div
                        className={
                            direction === "horizontal"
                                ? "flex flex-wrap gap-6"
                                : "space-y-2"
                        }
                    >

                        {options.map(option => (

                            <label
                                key={option.value}
                                className="flex items-center gap-2"
                            >

                                <input
                                    type="checkbox"
                                    checked={values.includes(option.value)}
                                    onChange={() => toggle(option.value)}
                                />

                                {option.name}

                            </label>

                        ))}

                    </div>

                );

            }}

        </BaseChoice>

    );

}