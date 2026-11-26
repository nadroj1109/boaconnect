export function buildPages(

    current,

    last,

    window = 2

) {

    const pages = [];

    const start = Math.max(

        1,

        current - window

    );

    const end = Math.min(

        last,

        current + window

    );

    if (start > 1) {

        pages.push(1);

        if (start > 2) {

            pages.push("...");

        }

    }

    for (

        let i = start;

        i <= end;

        i++

    ) {

        pages.push(i);

    }

    if (end < last) {

        if (

            end < last - 1

        ) {

            pages.push("...");

        }

        pages.push(last);

    }

    return pages;

}