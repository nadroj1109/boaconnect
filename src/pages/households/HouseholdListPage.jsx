import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { UsersIcon } from "@heroicons/react/24/outline";

import { DataTable } from "../../components/datatable";

import useHouseholds from "../../hooks/useHouseholds";

export default function HouseholdListPage() {

    const navigate = useNavigate();

    const {

        households,

        loading,

        pagination,

        table,

        refresh,

    } = useHouseholds();

    // console.log(table.requestParams);

    const columns = [

        {

            key:"household_no",

            title:"Household No",

            sortable:true,

        },

        {

            key:"household_name",

            title:"Household Name",

            sortable:true,

        },

        // {

        //     key:"sitio_purok",

        //     title:"Sitio/Purok",

        // },

        {

            key:"complete_address",

            title:"Complete Address",

        },

        {

            key:"no_of_family",

            title:"No. of Family/ies",

            sortable:true,

        },

        {

            key:"no_of_hh_member",

            title:"No. of Members",

            sortable:true,

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

                rows={households}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={()=>

                    navigate("/households/create")

                }

                actions={{

                    edit: (row)=> navigate(`/households/${row.id}/edit`),

                    delete: (row)=> confirmDelete(row),

                    // view: (row)=> navigate(`/households/${row.id}/members`),

                    view: {
                        label: "Members",
                        icon: UsersIcon,
                        color: "blue",
                        onClick: (row) =>
                            navigate(`/households/${row.id}/members`),
                    },

                }}

            />

        </PageContainer>

    );

}