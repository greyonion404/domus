import { useState, useEffect } from "react"
import { getPersistantState, useMapStore, useModalStore, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text, centerChilds } from "../../styles/Text";
import { getOwnedPropertiesOfUser } from "../../Utils/database";
import { OwnedPropertiesBox, Property, PropertyContainer, SearchPropertyInput } from "./OwnedProperties.styles";
import { MdDesktopAccessDisabled } from 'react-icons/md';
import Modal from "../Modal/Modal";
import MoveMapMarkerModal from "../Modals/MoveMapMarkerModal";
import Map from "../Map/index";
import { ModalTypes, showModal } from "../../Utils/useModal";
import { FaMap } from "react-icons/fa";
import { BiHash } from "react-icons/bi";
import { isEqualFloat } from "../../Utils/floatComparison";


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


function PropertySnippet({ property, profile, openModal, setPosition }) {

    const setMarkerPosition = useMapStore((state) => state.setMarkerPosition);
    function openMapModal() {
        let currentPosition = { lat: property.latitude, lng: property.longitude };
        setMarkerPosition(currentPosition);
        setPosition(currentPosition);
        openModal(ModalTypes.MapMarkerModal)
    }
    function hasMapLocation() {
        return !(isEqualFloat(property.latitude, 0) && isEqualFloat(property.longitude, 0))
    }

    return (
        <Property>
            <Text size={2} underline>{`Address`} </Text>
            <Text size={1}>{property.address}</Text>
            <Text size={1} style={{ ...centerChilds, justifyContent: "left" }}>{`owned by`} <BiHash /> {profile.name}  </Text>
            <Text underline size={2}>{`Description`} </Text>
            <Text size={1}> {property.description} </Text>
            {
                hasMapLocation() &&
                <Text size={2} style={centerChilds}> <FaMap onClick={() => { openMapModal() }} /> </Text>
            }
        </Property>

    )
}


export default function OwnedProperties({ profile }) {

    const modalType = useModalStore((state) => state.modalType);
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const setModalType = useModalStore((state) => state.setModalType);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);

    const [position, setPosition] = useState([]);
    const [address, setAddress] = useState("");

    function openModal(type) {
        setModalType(type);
        toggleIsModalOpen();
    }

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
                        return (<PropertySnippet key={property.propertyID}
                            property={property}
                            profile={profile}
                            openModal={openModal}
                            setPosition={setPosition}
                        />)
                    })
                }
            </PropertyContainer>

            <Modal showModal={showModal(ModalTypes.MapMarkerModal, modalType, isModalOpen, setPosition)}>
                <MoveMapMarkerModal>
                    <Map address={address} position={position} />
                </MoveMapMarkerModal>
            </Modal>

        </OwnedPropertiesBox>
    )
}