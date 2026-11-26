import { useContext } from "react";
import DataTableContext from "../contexts/DataTableContext";

export default function useDataTableContext() {

    const context = useContext(DataTableContext);

    if (!context) {

        throw new Error(
            "useDataTableContext must be used inside DataTable."
        );

    }

    return context;

}