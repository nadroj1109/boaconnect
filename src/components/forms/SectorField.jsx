import useFormContext from "../../hooks/useFormContext";

export default function SectorField({

    name = "sectors",

    sectors = [],

}) {

    const form = useFormContext();

    const values = form.values[name] ?? [];

    function isChecked(id) {

        return values.some(

            sector => sector.sector_id === id

        );

    }

    function getSector(id) {

        return values.find(

            sector => sector.sector_id === id

        );

    }

    function toggleSector(option) {

        const exists = isChecked(option.value);

        if (exists) {

            form.setValue(

                name,

                values.filter(

                    sector => sector.sector_id !== option.value

                )

            );

            return;

        }

        form.setValue(name, [

            ...values,

            {

                sector_id: option.value,

                registered: option.is_registrable
                    ? null
                    : null,

            },

        ]);

    }

    function setRegistered(id, registered) {

        form.setValue(

            name,

            values.map(sector =>

                sector.sector_id === id

                    ? {

                        ...sector,

                        registered,

                    }

                    : sector

            )

        );

    }

    return (

        <div className="overflow-hidden rounded-lg border border-gray-300">

            <div className="grid grid-cols-12 bg-gray-100 border-b">

                <div className="col-span-8 px-4 py-3 font-semibold">

                    Sector

                </div>

                <div className="col-span-4 px-4 py-3 text-center font-semibold">

                    Registered?

                </div>

            </div>

            {sectors.map(option => {

                const checked = isChecked(option.value);

                const selected = getSector(option.value);

                const checkboxId = `${name}-${option.value}`;

                const yesId = `${checkboxId}-yes`;

                const noId = `${checkboxId}-no`;

                return (

                    <div
                        key={option.value}
                        className="grid grid-cols-12 items-center border-b last:border-b-0"
                    >

                        <div className="col-span-8 px-4 py-3">

                            <label
                                htmlFor={checkboxId}
                                className="flex cursor-pointer items-center gap-3"
                            >

                                <input
                                    id={checkboxId}
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleSector(option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300"
                                />

                                <span>

                                    {option.name}

                                </span>

                            </label>

                        </div>

                        <div className="col-span-4 px-4 py-3">

                            {option.is_registrable && checked ? (

                                <div className="flex justify-center gap-6">

                                    <label
                                        htmlFor={yesId}
                                        className="flex cursor-pointer items-center gap-2"
                                    >

                                        <input
                                            id={yesId}
                                            type="radio"
                                            name={`${checkboxId}-registered`}
                                            checked={
                                                selected?.registered === true
                                            }
                                            onChange={() =>
                                                setRegistered(
                                                    option.value,
                                                    true
                                                )
                                            }
                                        />

                                        Yes

                                    </label>

                                    <label
                                        htmlFor={noId}
                                        className="flex cursor-pointer items-center gap-2"
                                    >

                                        <input
                                            id={noId}
                                            type="radio"
                                            name={`${checkboxId}-registered`}
                                            checked={
                                                selected?.registered === false
                                            }
                                            onChange={() =>
                                                setRegistered(
                                                    option.value,
                                                    false
                                                )
                                            }
                                        />

                                        No

                                    </label>

                                </div>

                            ) : (

                                <div className="text-center text-gray-400">

                                    —

                                </div>

                            )}

                        </div>

                    </div>

                );

            })}

        </div>

    );

}