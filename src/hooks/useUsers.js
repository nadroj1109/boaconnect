import { useEffect, useState, useCallback } from "react";

import * as UserAPI from "../api/users.api";

import useDataTable from "./useDataTable";

export default function useUsers() {
    const [errors, setErrors] = useState({});

    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(false);

    const table = useDataTable({

        sort: "created_at",

        direction: "desc",

    });

    async function store(data) {

        setErrors({});

        try {

            await UserAPI.storeUser(data);

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

            await UserAPI.updateUser(

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

    async function fetchUsers() {

        setLoading(true);

        try {
            
            const response = await UserAPI.getUsers(table.requestParams);
            // console.log(response.data.data);

            setUsers(response.data.data);

            setPagination(response.data.meta);
        
        } catch (error) {
            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchUsers();

    }, [table.requestParams]);

    async function show(id) {
        
        setLoading(true);

        try {

            const response = await UserAPI.getUser(id);
            // console.log(response.data.data);

            return response.data.data;
            
        } catch (error) {

            console.log(error);
            
        } finally {

            setLoading(false);

        }

    }

    async function remove(id) {

        await UserAPI.deleteUser(id);

        fetchUsers();

    }

    async function toggleStatus(id) {

        await UserAPI.toggleUserStatus(id);

        fetchUsers();

    }

    async function resetPassword(id) {

        await UserAPI.resetUserPassword(id);

    }

    return {

        users,

        loading,

        pagination,

        refresh: fetchUsers,

        remove,

        toggleStatus,

        resetPassword,

        store,

        update,

        show,

        errors,

        table,

    };

}