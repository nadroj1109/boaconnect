import { useEffect, useState } from "react";

import residentService from "../services/residentService";

import useDataTable from "./useDataTable";

export default function useResidentRegistrations() {
    
    const [residents,setResidents]=useState([]);
    
    const [pagination,setPagination]=useState({});

    const [errors, setErrors] = useState({});
    
    const [loading,setLoading]=useState(true);

    const table = useDataTable({
        
        sort: "last_name",

        direction: "asc",

    });

    useEffect(()=>{

        fetchResidents();

    },[table.requestParams]);

    async function fetchResidents(){

        setLoading(true);

        try{
            
            const response=await residentService.residentRegistrations(
                table.requestParams
            );

            // console.log(response.data);

            setResidents(response.data.data);

            setPagination(response.data.meta);
        }catch (error) {

            console.log(error);

        }finally{

            setLoading(false);

        }

    }

    async function update(id, data) {
    
        setErrors({});

        try {

            await residentService.updateResidentHousehold(

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

    return{

        residents,

        update,

        errors,

        loading,

        pagination,

        refresh:fetchResidents,

        table,

    };

}