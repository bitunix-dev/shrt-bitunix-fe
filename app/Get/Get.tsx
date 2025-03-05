'use client'

import { DataTable } from "@/components/dataTable/DataTable"
import { Create } from "../Create/Link/Create"
import { useGetUrls } from "@/hooks/useGetUrls"

export const Get = () => {

    const {data, refetch} = useGetUrls()

    return (
        <DataTable
            BtnCreate={<Create refetch={refetch}/>}
            data={data?.data}
        />
    )
}