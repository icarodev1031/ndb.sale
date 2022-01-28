import { useQuery } from "@apollo/client"
import React from "react"
import { useState } from "react"
import { GET_USER } from "../../apollo/graghqls/querys/Auth"
import { GET_USER_TIERS } from "../profile/profile-queries"

export default function UserTier() {
    // Containers
    const [userTiersData, setUserTiersData] = useState(null)
    const [userData, setUserData] = useState(null)
    // Methods
    
    // Webservice
    const { loading: userTiersLoading } = useQuery(GET_USER_TIERS, {
        onCompleted: (data) => setUserTiersData(data.getUserTiers),
    })
    const { loading: userLoading } = useQuery(GET_USER, {
        onCompleted: (data) => setUserData(data.getUser),
    })
    const loading = userTiersLoading || userLoading
    // Render
    if (loading) return <></>
    else
        return (
            <div
                className="header-avatar-user-tier"
                dangerouslySetInnerHTML={{
                    __html: userTiersData?.filter((item) => item?.level === userData?.tierLevel)[0]
                        ?.svg,
                }}
            />
        )
}
