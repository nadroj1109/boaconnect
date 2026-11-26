import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import DetailsModal from "../../components/modal/DetailsModal";
import ResidentDetailsModal from "../../components/residents/ResidentDetailsModal";

import { DataTable } from "../../components/datatable";

import useModal from "../../hooks/useModal";
import useResidentRegistrations from "../../hooks/useResidentRegistrations";

export default function ResidentRegistrationListPage() {

    const navigate = useNavigate();

    const modal = useModal();

    const [selectedResidentId, setSelectedResidentId] = useState(null);

    const {

        residents,

        loading,

        pagination,

        table,

        refresh,

    } = useResidentRegistrations();

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

            <DataTable

                columns={columns}

                rows={residents}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                actions={{

                    view: {
                        label: "More Details",
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
                            onResidentUpdated={refresh}

                        />

                    )

                }

            </DetailsModal>

        </PageContainer>
        

    );

}