import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import DetailsModal from "../../components/modal/DetailsModal";
import ResidentDetailsModal from "../../components/residents/ResidentDetailsModal";

import { DataTable } from "../../components/datatable";

import useHouseholds from "../../hooks/useHouseholds";
import useResidents from "../../hooks/useResidents";
import useModal from "../../hooks/useModal";

export default function HouseholdMemberPage() {

    const navigate = useNavigate();
    const { householdId } = useParams();
    // console.log(id);

    const modal = useModal();

    const { show } = useHouseholds();

    const [household,setHousehold]=useState([]);
    const [selectedResidentId, setSelectedResidentId] = useState(null);

    const residentFilters = useMemo(() => ({

        household_id: householdId,

    }), [householdId]);

    useEffect(() => {
        
            async function load() {
    
                try {
    
                    const response = await show(householdId);
                    // console.log(response);
                    setHousehold(response);
    
                }
    
                catch {
    
                    notify.error("Unable to load household.");
    
                }
    
            }
    
            load();
    
        }, [householdId]);

    const {

        residents,

        loading,

        pagination,

        table,

        refresh,

    } = useResidents(residentFilters);

    // console.log(residents);

    const columns = [

        {

            key:"last_name",

            title:"LAST NAME",

            sortable:true,

        },

        {

            key:"first_name",

            title:"FIRST NAME",

            sortable:true,

        },

        {

            key:"middle_name",

            title:"MIDDLE NAME",

        },

        {

            key:"ext_name",

            title:"EXT. NAME",

        },

        {

            key:"relationship_to_hh_head_name",

            title:"RELATIONSHIP TO HOUSEHOLD HEAD",

        },

        {

            key:"source_of_income_name",

            title:"SOURCE OF INCOME",

        },

        {

            key:"monthly_income",

            title:"Monthly Income",

            sortable:true,

            render:(row)=>

                Number(row.monthly_income).toLocaleString(),

        },
    ];

    return (

        <PageContainer>

            <PageHeader />

            <PageCard>
                <h5>Household Number: {household?.household_no}</h5>
            </PageCard>

            <DataTable

                columns={columns}

                rows={residents}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={()=>

                    navigate(`/households/${householdId}/members/create`)

                }

                actions={{

                    edit: (row)=> navigate(`/households/${householdId}/members/${row.id}/edit`),

                    delete: (row)=> confirmDelete(row),

                    view: {
                        label: "Details",
                        onClick: (row) => {
                            setSelectedResidentId(row.id);
                            modal.show();
                        },
                    },

                }}

            />

            <DetailsModal

                open={modal.open}

                onClose={() => {

                    modal.hide();

                    setSelectedResidentId(null);

                }}

                title="Resident Information"

                subtitle="View resident details"

                size="lg"

            >

                {

                    selectedResidentId && (

                        <ResidentDetailsModal

                            residentId={selectedResidentId}

                        />

                    )

                }

            </DetailsModal>

        </PageContainer>
        

    );

}