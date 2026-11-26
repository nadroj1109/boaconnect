import { useCallback, useEffect, useState } from "react";
import childNutritionMonitoringService from "../services/childNutritionMonitoringService";

const defaultSettings = {
    age_restriction_enabled: false,
    minimum_age_months: "",
    maximum_age_months: "",
};

export default function useChildNutritionSettings() {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchSettings = useCallback(async () => {
        setLoading(true);

        try {
            const response =
                await childNutritionMonitoringService.getSettings();

            setSettings({
                ...defaultSettings,
                ...response.data.data,
                minimum_age_months:
                    response.data.data?.minimum_age_months ?? "",
                maximum_age_months:
                    response.data.data?.maximum_age_months ?? "",
            });
        } catch (error) {
            console.error("Unable to fetch child nutrition settings:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    async function update(payload) {
        setSaving(true);

        try {
            const response =
                await childNutritionMonitoringService.updateSettings(payload);

            setSettings({
                ...defaultSettings,
                ...response.data.data,
                minimum_age_months:
                    response.data.data?.minimum_age_months ?? "",
                maximum_age_months:
                    response.data.data?.maximum_age_months ?? "",
            });

            return response.data;
        } finally {
            setSaving(false);
        }
    }

    return {
        settings,
        setSettings,
        loading,
        saving,
        refresh: fetchSettings,
        update,
    };
}
