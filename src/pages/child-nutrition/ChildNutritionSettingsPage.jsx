import { useEffect, useState } from "react";

import {
    AdjustmentsHorizontalIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { notify } from "../../notifications";
import useChildNutritionSettings from "../../hooks/useChildNutritionSettings";

export default function ChildNutritionSettingsPage() {
    const {
        settings,
        setSettings,
        loading,
        saving,
        refresh,
        update,
    } = useChildNutritionSettings();

    const [errors, setErrors] = useState({});

    function handleChange(field, value) {
        setSettings(current => ({
            ...current,
            [field]: value,
        }));

        setErrors(current => ({
            ...current,
            [field]: null,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setErrors({});

        const payload = {
            age_restriction_enabled: settings.age_restriction_enabled,
            minimum_age_months: settings.age_restriction_enabled
                ? Number(settings.minimum_age_months)
                : null,
            maximum_age_months: settings.age_restriction_enabled
                ? Number(settings.maximum_age_months)
                : null,
        };

        try {
            await update(payload);
            notify.success("Child nutrition settings updated successfully.");
        } catch (error) {
            const validationErrors = error.response?.data?.errors;

            if (validationErrors) {
                setErrors(
                    Object.fromEntries(
                        Object.entries(validationErrors).map(([key, value]) => [
                            key,
                            value?.[0],
                        ])
                    )
                );
            } else {
                notify.error("Unable to update child nutrition settings.");
            }
        }
    }

    if (loading) {
        return (
            <PageContainer>
                <PageHeader
                    title="Child Nutrition Settings"
                    subtitle="Configure child eligibility for nutrition monitoring."
                />

                <PageCard>
                    <div className="flex justify-center py-12">
                        <LoadingSpinner
                            size="md"
                            text="Loading settings..."
                        />
                    </div>
                </PageCard>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader
                title="Child Nutrition Settings"
                subtitle="Configure the eligibility requirements for child nutrition monitoring."
            />

            <PageCard>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Age Eligibility Configuration
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Set the eligible age range for children who
                                can be registered for annual monitoring.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                        <label className="flex cursor-pointer items-center justify-between gap-4">
                            <div>
                                <span className="font-medium text-slate-800">
                                    Enable Age Restriction
                                </span>

                                <p className="mt-1 text-sm text-slate-500">
                                    Restrict child registration based on age.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={!!settings.age_restriction_enabled}
                                onChange={event =>
                                    handleChange(
                                        "age_restriction_enabled",
                                        event.target.checked
                                    )
                                }
                                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    {settings.age_restriction_enabled && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Minimum Age (Months)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={settings.minimum_age_months}
                                    onChange={event =>
                                        handleChange(
                                            "minimum_age_months",
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter minimum age"
                                    required
                                />

                                {errors.minimum_age_months && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.minimum_age_months}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Maximum Age (Months)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={settings.maximum_age_months}
                                    onChange={event =>
                                        handleChange(
                                            "maximum_age_months",
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter maximum age"
                                    required
                                />

                                {errors.maximum_age_months && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.maximum_age_months}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {!settings.age_restriction_enabled && (
                        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                            Age restriction is disabled. Children with
                            recorded dates of birth will not be filtered
                            by the configured age range.
                        </div>
                    )}

                    <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                        <button
                            type="button"
                            onClick={refresh}
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <ArrowPathIcon className="h-4 w-4" />
                            Refresh
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Settings"}
                        </button>
                    </div>
                </form>
            </PageCard>
        </PageContainer>
    );
}
