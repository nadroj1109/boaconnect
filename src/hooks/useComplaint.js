import { useState } from "react";

import complaintService from "../services/complaintService";

export default function useComplaint() {

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);


    async function store(data) {

        setErrors({});

        try {

            return await complaintService.create(
                data
            );

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

            return await complaintService.update(
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

        try {

            const response =
                await complaintService.show(id);

            return response.data.data;

        } finally {

            setLoading(false);

        }

    }

    async function createHistorical(data) {

        setErrors({});

        try {

            return await complaintService
                .createHistorical(data);

        } catch (error) {

            if (
                error.response?.status === 422
            ) {

                setErrors(
                    error.response.data.errors
                );

            }

            throw error;

        }

    }


    return {

        store,

        update,

        show,

        createHistorical,

        errors,

        loading,

    };

}