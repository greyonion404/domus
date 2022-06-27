import { useState, useEffect} from "react"
import { getOwnedPropertiesOfUser } from "../../Utils/database";


export default function OwnedProperties({ profile }) {

    const [properties, setProperties] = useState([]);

    async function fetchProperties() {
        let {data, error} = await getOwnedPropertiesOfUser(profile.authID);
        if(data) setProperties(data);
    }

    useEffect(() => {
        fetchProperties();
        return () => {
        };
    }, []);


    return (
        <>
            {JSON.stringify(properties)}
        </>
    )
}