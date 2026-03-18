import { useEffect,useState } from "react";



const useOnlineStatus = () => {

    const [onlinestatus, setOnlineStatus] = useState(true);
    // check if online

    useEffect(() => {

        window.addEventListener("offline", () => {
            setOnlineStatus(false);

        })

        window.addEventListener("online", () => {
            setOnlineStatus(true);

        })

    }, [])

    // boolean value
    return onlinestatus;
}


export default useOnlineStatus;