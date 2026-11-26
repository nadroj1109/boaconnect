import { useState, useEffect } from "react";

import SectionCard from "../common/SectionCard";
import DescriptionGrid from "../common/DescriptionGrid";
import DescriptionItem from "../common/DescriptionItem";
import LoadingSpinner from "../common/LoadingSpinner";
import BadgeGroup from "../common/BadgeGroup";
import StatusBadge from "../common/StatusBadge";
import useModal from "../../hooks/useModal";
import { InfoButton } from "../button";

import {
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

import useResident from "../../hooks/useResident";

import ResidentHouseholdDetailModal from "./ResidentHouseholdDetailModal";

export default function ResidentDetailsModal({
    residentId
}){
    const residentHouseholdModal = useModal();

    const [
        selected,
        setSelected,
    ] = useState(null);

    const {
        show,
        refresh,
    } = useResident();

    const [resident, setResident] = useState(null);

    function editResidentHousehold(
        resident
    ) {

        setSelected(
            resident
        );

        residentHouseholdModal.show();

    }

    useEffect(() => {

        async function load() {

            const data = await show(residentId);
            // console.log(data);

            setResident(data);

        }

        load();

    }, [residentId]);

    if (!resident) {

        return <LoadingSpinner />;

    }

    return (
        <div className="space-y-6">

            {/* Personal Information */}
            <SectionCard title="Personal Information">

                <DescriptionGrid>

                    <DescriptionItem label="Type of Resident" value={resident.type_of_resident_name} />

                    <DescriptionItem label="PhilSys Card No." value={resident.philsys_card_no} />

                    <DescriptionItem label="Last Name" value={resident.last_name} />

                    <DescriptionItem label="First Name" value={resident.first_name} />

                    <DescriptionItem label="Middle Name" value={resident.middle_name} />

                    <DescriptionItem label="Extension Name" value={resident.ext_name} />

                    <DescriptionItem label="Date of Birth" value={resident.date_of_birth} />

                    <DescriptionItem label="Age" value={resident.age} />

                    <DescriptionItem label="Place of Birth" value={resident.place_of_birth} />

                    <DescriptionItem label="Resident Since Birth" value={resident.res_mother_upon_birth ? "Yes" : "No"} />

                    <DescriptionItem label="Sex" value={resident.sex_name} />

                    <DescriptionItem label="Gender" value={resident.gender_name} />

                    <DescriptionItem label="Civil Status" value={resident.civil_status_name} />

                    <DescriptionItem label="Pregnant Woman" value={resident.pregnant_woman ? "Yes" : "No"} />

                    <DescriptionItem label="Highest Educational Attainment" value={resident.highest_educ_attainment_name} />

                    <DescriptionItem label="Profession / Occupation" value={resident.profession_occupation} />

                </DescriptionGrid>

            </SectionCard>

            {/* Contact Information */}
            <SectionCard title="Contact Information">

                <DescriptionGrid>

                    <DescriptionItem label="Email Address" value={resident.email_address} />

                    <DescriptionItem label="Mobile Number" value={resident.mobile_no} />

                    <DescriptionItem label="Telephone Number" value={resident.tel_no} />

                </DescriptionGrid>

            </SectionCard>

            {/* Address */}
            <SectionCard title="Address">

                <DescriptionGrid>

                    <DescriptionItem label="Region" value={resident.region_name} />

                    <DescriptionItem label="Province" value={resident.province_name} />

                    <DescriptionItem label="City / Municipality" value={resident.city_name} />

                    <DescriptionItem label="Barangay" value={resident.barangay_name} />

                    <DescriptionItem label="Sitio / Purok" value={resident.sitio_purok} />

                    <DescriptionItem label="House No." value={resident.house_no} />

                    <DescriptionItem label="Street Name" value={resident.street_name} />

                    <DescriptionItem label="Subdivision" value={resident.subdivision} />

                    <DescriptionItem label="ZIP Code" value={resident.zip_code} />

                </DescriptionGrid>

            </SectionCard>

            {/* Physical Information */}
            <SectionCard title="Physical Information">

                <DescriptionGrid>

                    <DescriptionItem label="Blood Type" value={resident.blood_type} />

                    <DescriptionItem label="Height (m)" value={resident.height} />

                    <DescriptionItem label="Weight (kg)" value={resident.weight} />

                    <DescriptionItem label="Complexion" value={resident.complexion_name} />

                    <DescriptionItem label="Nationality" value={resident.nationality_name} />

                </DescriptionGrid>

            </SectionCard>

            {/* Voter Information */}
            <SectionCard title="Voter Information">

                <DescriptionGrid>

                    <DescriptionItem label="Registered Voter" value={resident.registered_voter ? "Yes" : "No"} />

                    <DescriptionItem label="Resident Voter" value={resident.resident_voter ? "Yes" : "No"} />

                    <DescriptionItem label="Last Voted Year" value={resident.last_voted_yr} />

                </DescriptionGrid>

            </SectionCard>

            {/* Family Information */}
            <SectionCard title="Family Information">

                <DescriptionGrid>

                    <DescriptionItem label="Ethnicity" value={resident.ethnicity_name} />

                    <DescriptionItem label="Religion" value={resident.religion_name} />

                    <DescriptionItem label="Mother's First Name" value={resident.mother_fname} />

                    <DescriptionItem label="Mother's Middle Name" value={resident.mother_midname} />

                    <DescriptionItem label="Mother's Last Name" value={resident.mother_lname} />

                    <DescriptionItem label="Relationship to Household Head" value={resident.relationship_to_hh_head_name} />

                </DescriptionGrid>

            </SectionCard>

            {/* Government Assistance */}
            <SectionCard title="Government Assistance">

                <DescriptionGrid>

                    <DescriptionItem label="Government Assistance Program" value={resident.govt_asst_progam_name} />

                    <DescriptionItem label="Other Program" value={resident.govt_asst_progam_other} />

                </DescriptionGrid>

            </SectionCard>

            {/* Income */}
            <SectionCard title="Income Information">

                <DescriptionGrid>

                    <DescriptionItem label="Source of Income" value={resident.source_of_income_name} />

                    <DescriptionItem label="Other Source of Income" value={resident.source_of_income_other} />

                    <DescriptionItem
                        label="Monthly Income"
                        value={
                            resident.monthly_income
                                ? Number(resident.monthly_income).toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                })
                                : "-"
                        }
                    />

                </DescriptionGrid>

            </SectionCard>

            {/* Sectors */}
            <SectionCard title="Sectors">

                <BadgeGroup

                    items={resident.sectors}

                    render={(sector)=>(

                        <StatusBadge

                            color={

                                sector.registered === true

                                    ? "green"

                                    : sector.registered === false

                                        ? "orange"

                                        : "blue"

                            }

                            dot

                        >

                            {

                                sector.registered === null

                                    ? sector.sector_name

                                    : `${sector.sector_name} (${sector.registered ? "Registered" : "Not Registered"})`

                            }

                        </StatusBadge>

                    )}

                />

            </SectionCard>

            {resident?.household_id === null && (
                    <>
                        <div className="flex justify-end">
                            <InfoButton
                                onClick={() =>
                                    editResidentHousehold(
                                        resident
                                    )
                                }
                                icon={PencilSquareIcon}
                                size="sm"
                            >
                                Update Household Number
                            </InfoButton>
                        </div>

                        <ResidentHouseholdDetailModal
                            open={
                                residentHouseholdModal.open
                            }
                            residentId={
                                residentId
                            }
                            resident={
                                selected
                            }
                            onClose={
                                residentHouseholdModal.hide
                            }
                            onSuccess={
                                refresh
                            }
                        />
                    </>
                )
                
            }

        </div>
        
    );
}