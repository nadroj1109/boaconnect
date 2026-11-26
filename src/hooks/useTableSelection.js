import { useMemo, useState } from "react";

export default function useTableSelection(
    rows = [],
    keyField = "id"
) {

    const [selected, setSelected] = useState([]);

    const selectedSet = useMemo(
        () => new Set(selected),
        [selected]
    );

    const selectedRows = useMemo(
        () =>
            rows.filter(row =>
                selectedSet.has(row[keyField])
            ),
        [rows, selectedSet, keyField]
    );

    const allSelected =
        rows.length > 0 &&
        rows.every(row =>
            selectedSet.has(row[keyField])
        );

    const partiallySelected =
        selected.length > 0 &&
        !allSelected;

    function toggle(id) {

        setSelected(prev =>

            prev.includes(id)

                ? prev.filter(x => x !== id)

                : [...prev, id]

        );

    }

    function toggleAll() {

        if (allSelected) {

            setSelected([]);

            return;

        }

        setSelected(

            rows.map(row => row[keyField])

        );

    }

    function clear() {

        setSelected([]);

    }

    return {

        selected,

        selectedRows,

        selectedCount: selected.length,

        allSelected,

        partiallySelected,

        toggle,

        toggleAll,

        clear,

    };

}