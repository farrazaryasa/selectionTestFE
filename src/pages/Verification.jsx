import { Link, useParams } from "react-router-dom";
import SuccessVerify from "../components/verification/SuccessVerify";
import { verifyUser } from "../api/users";
import { useEffect, useState } from "react";
import FailedVerify from "../components/verification/FailedVerify";


export default function VerificationPage() {
    const { token } = useParams()
    const [verify, setVerify] = useState(false)

    const checkToken = async () => {
        try {
            if (token) {
                const result = await verifyUser(token)

                if (result.data.success === true) {
                    setVerify(true)
                }
            }
        } catch (error) {
            setVerify(false);
        }
    }

    useEffect(() => {
        checkToken()
    }, [])
    return (
        <>
            {verify ?
                <SuccessVerify />
                :
                <FailedVerify />
            }
        </>
    )
}
