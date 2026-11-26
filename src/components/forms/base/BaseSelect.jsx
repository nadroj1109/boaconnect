import Select from "react-select";
import AsyncSelect from "react-select/async";

import BaseField from "./BaseField";
import FieldWrapper from "./FieldWrapper";

import reactSelectStyles from "../styles/reactSelectStyles";

export default function BaseSelect({

    name,

    label,

    hint,

    required = false,

    options = [],

    isMulti = false,

    isAsync = false,

    loadOptions,

    getOptionLabel = (option) =>
        option.label ?? option.name,

    getOptionValue = (option) =>
        option.value ?? option.id,

    isLoading = false,

    isDisabled = false,

    onChange,

    ...props

}) {

    const Component =

        isAsync

            ? AsyncSelect

            : Select;

    return (

        <BaseField name={name}>

            {(field) => {

                const selected = isMulti

                    ? options.filter(option =>

                        (field.value ?? []).map(String).includes(

                            String(
                                getOptionValue(option)
                            )

                        )

                    )

                    : options.find(option =>

                        String(
                            getOptionValue(option)
                        ) === String(field.value)

                    ) ?? null;

                return (

                    <FieldWrapper

                        id={name}

                        label={label}

                        hint={hint}

                        required={required}

                        error={field.error}

                    >

                        <Component

                            {...props}

                            inputId={name}

                            options={options}

                            loadOptions={loadOptions}

                            isMulti={isMulti}

                            value={selected}

                            getOptionLabel={getOptionLabel}

                            getOptionValue={getOptionValue}

                            isDisabled={

                                isDisabled ||

                                field.processing

                            }

                            isLoading={isLoading}

                            isSearchable

                            isClearable

                            closeMenuOnSelect={!isMulti}

                            hideSelectedOptions={isMulti}

                            noOptionsMessage={() =>

                                "No records found."

                            }

                            loadingMessage={() =>

                                "Loading..."

                            }

                            onChange={(selected) => {

                                const value = isMulti
                                    ? (
                                        selected
                                            ? selected.map(
                                                getOptionValue
                                            )
                                            : []
                                    )
                                    : (
                                        selected
                                            ? getOptionValue(selected)
                                            : null
                                    );

                                field.setValue(value);

                                onChange?.(value);

                            }}

                            styles={reactSelectStyles}

                            menuPortalTarget={document.body}

                            menuPosition="fixed"

                        />

                    </FieldWrapper>

                );

            }}

        </BaseField>

    );

}