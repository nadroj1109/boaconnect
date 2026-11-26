import { useState } from "react";
import profileService from "../services/profileService";

export default function useProfile() {

    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState(null);

    async function show() {

        setLoading(true);

        try {

            const response =
                await profileService.show();

            const data =
                response.data?.data;

            setProfile(data);

            return data;

        } finally {

            setLoading(false);

        }
    }

    async function update(data) {

        setLoading(true);

        try {

            return await profileService.update(data);

        } finally {

            setLoading(false);

        }
    }

    async function updatePassword(data) {

        setLoading(true);

        try {

            return await profileService.updatePassword(
                data
            );

        } finally {

            setLoading(false);

        }
    }

    async function updateSignature(file) {

        setLoading(true);

        try {

            return await profileService.updateSignature(
                file
            );

        } finally {

            setLoading(false);

        }
    }

    async function getSignature() {

        return profileService.getSignature();

    }

    return {
        profile,
        loading,
        show,
        update,
        updatePassword,
        updateSignature,
        getSignature,
    };
}