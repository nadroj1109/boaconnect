export default function BadgeGroup({

    items = [],

    empty = "-",

    render,

}) {

    if (!items.length) {

        return (

            <span className="text-slate-400">

                {empty}

            </span>

        );

    }

    return (

        <div className="flex flex-wrap gap-2">

            {items.map((item, index) => (

                <div key={item.id ?? index}>

                    {render(item)}

                </div>

            ))}

        </div>

    );

}