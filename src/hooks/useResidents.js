import { useEffect, useState } from "react";

import * as ResidentAPI from "../api/residents.api";

import useDataTable from "./useDataTable";

export default function useResidents(filters = {}) {
    
    const [residents,setResidents]=useState([]);
    
    const [pagination,setPagination]=useState({});
    
    const [loading,setLoading]=useState(true);

    const table = useDataTable({
        
        sort: "last_name",

        direction: "asc",

    });

    useEffect(()=>{

        fetchResidents();

    },[filters, table.requestParams]);

    async function fetchResidents(){

        setLoading(true);

        try{
            
            const response=await ResidentAPI.getResidents({
                ...filters, 
                ...table.requestParams
            });

            // console.log(response.data);

            setResidents(response.data.data);

            setPagination(response.data.meta);
        }catch (error) {

            console.log(error);

        }finally{

            setLoading(false);

        }

    }

    return{

        residents,

        loading,

        pagination,

        refresh:fetchResidents,

        table,

    };

}