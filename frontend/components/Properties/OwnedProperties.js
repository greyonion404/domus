import { useState, useEffect } from "react"
import { getPersistantState, useMapStore, useModalStore, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text, centerChilds } from "../../styles/Text";
import { getOwnedPropertiesOfUser } from "../../Utils/database";
import { IconTextBox, OwnedPropertiesBox, Property, PropertyContainer, SearchPropertyInput } from "./OwnedProperties.styles";
import { MdDesktopAccessDisabled } from 'react-icons/md';
import Modal from "../Modal/Modal";
import MoveMapMarkerModal from "../Modals/MoveMapMarkerModal";
import Map from "../Map/index";
import { ModalTypes, showModal } from "../../Utils/useModal";
import { FaCopy, FaEye, FaMap, FaTrash } from "react-icons/fa";
import { BiHash } from "react-icons/bi";
import { isEqualFloat } from "../../Utils/floatComparison";
import { copyTextToClipboard } from "../../Utils/copy";
import { AiFillEdit } from "react-icons/ai";



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
    function openPropertyEditModal() {
        openModal("");
    }
    function hasMapLocation() {
        return !(isEqualFloat(property.latitude, 0) && isEqualFloat(property.longitude, 0))
    }
    function hasRenter() {
        return property.renterID !== "";
    }
    const [showSecret, setShowSecret] = useState(false);

    return (
        <Property>
            <IconTextBox style={{ justifyContent: "space-between" }}>
                <Text size={1} active underline>{`Address`} </Text>
                <IconTextBox>
                    <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                        <AiFillEdit onClick={() => { openPropertyEditModal() }} />
                    </Text>
                    <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                        <FaTrash onClick={() => { openPropertyEditModal() }} />
                    </Text>
                </IconTextBox>
            </IconTextBox>
            <Text size={1}>{property.address}</Text>
            <Text size={1} style={{ ...centerChilds, justifyContent: "left" }}>{`owned by`} <BiHash /> {profile.name}  </Text>
            {
                hasRenter() &&
                <Text size={1} style={{ ...centerChilds, justifyContent: "left" }}>{`rented by`} <BiHash /> {"renter"}  </Text>
            }
            <Text underline active size={1}>{`Description`} </Text>
            <Text size={1}> {property.description} </Text>

            <IconTextBox>
                <Text underline active size={1}>{`Secret Key`} </Text>
                <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                    <FaEye onClick={() => { setShowSecret((state) => !state) }} />
                </Text>
                <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                    <FaCopy onClick={async () => { await copyTextToClipboard(property.propertySecretKey) }} />
                </Text>
            </IconTextBox>

            <Text size={1}> {showSecret ? property.propertySecretKey : " * * * * * * * * * * "} </Text>

            <IconTextBox>
                {hasMapLocation() && <Text underline active size={1}>{`Location`} </Text>}
                {hasMapLocation() && <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                    <FaMap onClick={() => { openMapModal() }} />
                </Text>}
            </IconTextBox>
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

            <Modal showModal={showModal("", modalType, isModalOpen, setPosition)}>

            </Modal>

        </OwnedPropertiesBox>
    )
}