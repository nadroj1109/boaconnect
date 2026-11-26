import { useState } from "react";

import * as ResidentAPI from "../api/residents.api";

export default function useResident() {

    const [errors, setErrors] = useState({});

    const [loading,setLoading]=useState(true);

    async function store(data) {

        setErrors({});

        try {

            await ResidentAPI.storeResident(data);

        } catch (error) {
            console.log(error.response);

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

            await ResidentAPI.updateResident(

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
        
        setLoading(true);

        try{
                    
            const response = await ResidentAPI.getResident(id);

            return response.data.data;

        } finally{

            setLoading(false);

        }
        
    }

    return{

        store,

        update,

        show,

        errors,

        loading,

    };

}