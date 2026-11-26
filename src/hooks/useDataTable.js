import { useMemo, useState } from "react";

import useDebounce from "./useDebounce";

export default function useDataTable({

    search = "",

    page = 1,

    per_page = 10,

    sort = "id",

    direction = "asc",

} = {}) {

    const [filters, setFilters] = useState({

        search,

        page,

        per_page,

        sort,

        direction,

    });

    const debouncedSearch = useDebounce(

        filters.search,

        500

    );

    const requestParams = useMemo(() => ({
        ...filters,

        // page: filters.page,
        // per_page: filters.per_page,
        // sort: filters.sort,
        // direction: filters.direction,

        search: debouncedSearch,

    }), [
        filters,

        // filters.page,
        // filters.per_page,
        // filters.sort,
        // filters.direction,

        debouncedSearch,

    ]);

    function setSearch(search) {

        setFilters(prev => ({

            ...prev,

            search,

            page: 1,

        }));

    }

    function setPage(page) {

        setFilters(prev => ({

            ...prev,

            page: Math.max(1, Number(page) || 1),

        }));

    }

    function setPerPage(per_page) {

        setFilters(prev => ({

            ...prev,

            per_page: Number(per_page),

            page: 1,

        }));

    }

    function setSort(column) {

        setFilters(prev => ({

            ...prev,

            sort: column,

            direction:

                prev.sort === column &&

                prev.direction === "asc"

                    ? "desc"

                    : "asc",

            page: 1,

        }));

    }

    function updateFilters(values) {

        setFilters(prev => ({

            ...prev,

            ...values,

            page: 1,

        }));

    }

    function resetFilters() {

        setFilters({

            search,

            page,

            per_page,

            sort,

            direction,

        });

    }

    return {

        filters,

        requestParams,

        debouncedSearch,

        setFilters,

        updateFilters,

        setSearch,

        setPage,

        setPerPage,

        setSort,

        resetFilters,

    };

}