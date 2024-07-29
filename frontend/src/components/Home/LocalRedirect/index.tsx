import { useNavigate } from "react-router-dom"
import { PropsWithChildren, useEffect } from "react"

const LocalRedirectProvider: React.FC<PropsWithChildren> = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('user_id')) {
            navigate('/login')
        }
    })
    return (
        <>
            {props.children}
        </>
    )
}

export default LocalRedirectProvider;