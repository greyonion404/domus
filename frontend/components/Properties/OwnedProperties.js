import { useState, useEffect } from "react"
import { getPersistantState, useModalStore, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text } from "../../styles/Text";
import { getOwnedPropertiesOfUser } from "../../Utils/database";
import { OwnedPropertiesBox, Property, PropertyContainer, SearchPropertyInput } from "./OwnedProperties.styles";
import { MdDesktopAccessDisabled } from 'react-icons/md';
import Modal from "../Modal/Modal";
import MoveMapMarkerModal from "../Modals/MoveMapMarkerModal";
import Map from "../Map/index";
import { ModalTypes, showModal } from "../../Utils/useModal";

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
    

    const modalType = useModalStore((state) => state.modalType);
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const setModalType = useModalStore((state) => state.setModalType);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);



    function openModal(type) {
        setModalType(type);
        toggleIsModalOpen();

    }

    return (
        <Property onClick={()=>{openModal(ModalTypes.MoveMapMarkerModal)}}>
            <Text size={2} underline>{`Adress`} </Text>
            <Text size={1}>{property.address}</Text>
            <Text underline size={2}>{`Description`} </Text>
            <Text size={1}> {property.description} </Text>
            <Text size={2} underline>{`owned by`} </Text>
            <Text> {profile.name} </Text>
            

            <Modal showModal={showModal(ModalTypes.MoveMapMarkerModal, modalType, isModalOpen)}>
                <MoveMapMarkerModal>
                    <Map draggable={true} address={property.address} />
                </MoveMapMarkerModal>
            </Modal>


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
            <SearchPropertyInput placeholder="address" spellCheck="false" />
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