import { useRouteError } from "react-router-dom"

export const ErrorComponent = () => {
    const error = useRouteError();
    console.log(error);
    return <h1>Please check path, {error.statusText}!!!</h1>
}