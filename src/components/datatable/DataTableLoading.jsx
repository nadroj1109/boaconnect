export default function DataTableLoading({

    columns,

    rows = 8,

}) {

    return (

        <>

            {

                Array.from({

                    length: rows,

                }).map((_, index)=>(

                    <tr

                        key={index}

                        className="border-b"

                    >

                        {

                            Array.from({

                                length: columns,

                            }).map((__, col)=>(

                                <td

                                    key={col}

                                    className="px-4 py-3"

                                >

                                    <div
                                        className="
                                            h-4
                                            animate-pulse
                                            rounded
                                            bg-slate-200
                                        "
                                    />

                                </td>

                            ))

                        }

                    </tr>

                ))

            }

        </>

    );

}