'use client'

import { DataTable } from "@/components/dataTable/DataTable"
import { Create } from "../Create/Link/Create"
import { useGetUrls } from "@/hooks/useGetUrls"

export const Get = () => {

    const {data, isLoading, error} = useGetUrls()


    return (
        <DataTable
            BtnCreate={<Create />}
            data={data?.data}
        />
    )
}