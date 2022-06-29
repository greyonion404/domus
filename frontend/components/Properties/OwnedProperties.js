import { useState, useEffect } from "react"
import { getPersistantState, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text } from "../../styles/Text";
import { getOwnedPropertiesOfUser } from "../../Utils/database";
import { OwnedPropertiesBox, Property, PropertyContainer, SearchPropertyInput } from "./OwnedProperties.styles";
import { MdDesktopAccessDisabled } from 'react-icons/md';

function RenterPrompt() {


    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };
    return <>
        <OwnedPropertiesBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text size={1} style={verticallyCenterChilds}>
                <MdDesktopAccessDisabled style={marginedRightText} />
                {"Viewing as renter, renter mode can't show owned properties"}
            </Text>
        </OwnedPropertiesBox>
    </>

}


function PropertySnippet({ property, profile }) {
    console.log();
    return (
        <Property>
            <Text>
                {profile.name}
            </Text>
            <Text>
                {property.address}
            </Text>
        </Property>

    )
}


export default function OwnedProperties({ profile }) {

    const [properties, setProperties] = useState([]);

    async function fetchProperties() {
        let { data, error } = await getOwnedPropertiesOfUser(profile.authID);
        if (data) setProperties(data);
    }

    useEffect(() => {
        fetchProperties();
        return () => {
        };
    }, []);

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    if (!getPersistantState(hasPersistance, isViewingAsOwner)) return <RenterPrompt />



    return (
        <OwnedPropertiesBox>
            <SearchPropertyInput placeholder="address" spellcheck="false" />
            <PropertyContainer>
                {
                    properties.map((property, index) => {
                        return (<PropertySnippet key={property.propertyID} property={property} profile={profile} />)
                    })
                }
            </PropertyContainer>
        </OwnedPropertiesBox>
    )
}