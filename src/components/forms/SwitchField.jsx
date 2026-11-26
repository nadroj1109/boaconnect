import BaseChoice from "./base/BaseChoice";

export default function SwitchField({

    label,

    trueLabel,

    falseLabel,

    showState = true,

    onChange,

    ...props

}) {

    return (

        <BaseChoice {...props}>

            {(field) => {

                const stateLabel = field.value
                    ? (trueLabel ?? label)
                    : (falseLabel ?? label);


                // console.log("SwitchField:", {
                //     name: field.name,
                //     value: field.value,
                //     checked: !!field.value,
                // });

                return (
                    <label className="inline-flex cursor-pointer items-center">
                        <span className="relative">
                            <input
                                type="checkbox"
                                checked={!!field.value}
                                onChange={(e) => { const checked = e.target.checked; field.setValue(checked); onChange?.( checked, field ); }}
                                className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                            />

                            <span
                                className="
                                    block
                                    h-6
                                    w-11
                                    rounded-full
                                    bg-gray-300
                                    transition
                                    peer-checked:bg-green-600

                                    after:absolute
                                    after:left-0.5
                                    after:top-0.5
                                    after:h-5
                                    after:w-5
                                    after:rounded-full
                                    after:bg-white
                                    after:shadow
                                    after:transition-transform
                                    peer-checked:after:translate-x-5
                                "
                            />
                        </span>

                        <span className="ml-3">
                            {showState ? stateLabel : label}
                        </span>
                    </label>
                );

            }}

        </BaseChoice>

    );

}