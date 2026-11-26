import { useEffect, useState } from "react";

import * as HouseholdAPI from "../api/household.api";

import useDataTable from "./useDataTable";

export default function useHouseholds() {
    const [errors, setErrors] = useState({});
    
    const [households,setHouseholds]=useState([]);
    
    const [pagination,setPagination]=useState({});
    
    const [loading,setLoading]=useState(true);

    const table = useDataTable({
        
        sort: "household_name",

        direction: "asc",

    });

    useEffect(()=>{

        fetchHouseholds();

    },[table.requestParams]);

    async function fetchHouseholds(){

        setLoading(true);

        try{
            
            const response=await HouseholdAPI.getHouseholds(table.requestParams);

            // console.log(response.data);

            setHouseholds(response.data.data);

            setPagination(response.data.meta);

        }finally{

            setLoading(false);

        }

    }

    async function store(data) {

        setErrors({});

        try {

            await HouseholdAPI.storeHousehold(data);

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(

                    error.response.data.errors

                );

            }

            throw error;

        }

    }

    async function update(id, data) {

        setErrors({});

        try {

            await HouseholdAPI.updateHousehold(

                id,

                data

            );

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(

                    error.response.data.errors

                );

            }

            throw error;

        }

    }

    async function show(id) {

        const response = await HouseholdAPI.getHousehold(id);

        return response.data.data;

    }

    return{

        households,

        loading,

        pagination,

        refresh:fetchHouseholds,

        store,

        update,

        show,

        errors,

        table,

    };

}