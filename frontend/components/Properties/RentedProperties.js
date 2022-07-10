import { useState, useEffect } from "react"
import { getPersistantState, useMapStore, useModalStore, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text, centerChilds } from "../../styles/Text";
import { getRentedPropertiesOfUser, getUserWithAuth0ID } from "../../Utils/database";
import { IconTextBox, OwnedPropertiesBox, Property, PropertyContainer, SearchPropertyInput } from "./OwnedProperties.styles";
import Modal from "../Modal/Modal";
import MoveMapMarkerModal from "../Modals/MoveMapMarkerModal";
import Map from "../Map/index";
import { ModalTypes, showModal } from "../../Utils/useModal";
import { FaCopy, FaEye, FaMap, FaTrash } from "react-icons/fa";
import { BiHash } from "react-icons/bi";
import { isEqualFloat } from "../../Utils/floatComparison";
import { copyTextToClipboard } from "../../Utils/copy";
import { AiFillEdit } from "react-icons/ai";
import DeleteOwnedPropertyModal from "../Modals/DeleteOwnedPropertyModal";
import EditPropertyModal from "../Modals/EditPropertyModal";
import DeleteRentedPropertyModal from "../Modals/DeleteRentedPropertyModal";

function PropertySnippet({ property, profile, openModal, setPosition, setAddress, setSelectedProperty }) {

    const setMarkerPosition = useMapStore((state) => state.setMarkerPosition);
    function openMapModal() {
        setAddress(property.address);
        let currentPosition = { lat: property.latitude, lng: property.longitude };
        setMarkerPosition(currentPosition);
        setPosition(currentPosition);
        openModal(ModalTypes.MapMarkerModal)
    }
  
    function openPropertyDeleteModal() {
        setSelectedProperty(property);
        openModal(ModalTypes.RentedPropertyDeleteModal);
    }
    function hasMapLocation() {
        return !(isEqualFloat(property.latitude, 0) && isEqualFloat(property.longitude, 0));
    }
    function hasDescription() {
        return (property.description !== "");
    }
    function hasRenter() {
        return property.renterID !== "";
    }
    const [showSecret, setShowSecret] = useState(false);
    const [renter, setRenter] = useState("");

    async function fetchRenter()
    {
        const { data, error } = await getUserWithAuth0ID(property.ownerID);
        if (data && data.length !== 0) setRenter(data[0]);
    }

    useEffect(() => {
       fetchRenter();
       return ()=>{        
       }

    }, []);

    return (
        <Property>
            <IconTextBox style={{ justifyContent: "space-between" }}>
                <Text size={1} active underline>{`Address`} </Text>
                <IconTextBox>
                    <Text size={1} style={{ ...centerChilds, justifyContent: "left", marginLeft: "10px" }}>
                        <FaTrash onClick={() => { openPropertyDeleteModal() }} />
                    </Text>
                </IconTextBox>
            </IconTextBox>
            <Text size={1}>{property.address}</Text>
            <Text size={1} style={{ ...centerChilds, justifyContent: "left" }}>{`owned by`} <BiHash /> {renter.name}  </Text>
            {
                hasRenter() &&
                <Text size={1} style={{ ...centerChilds, justifyContent: "left" }}>{`rented by`} <BiHash /> {profile.name}  </Text>
            }

            {hasDescription() && <Text underline active size={1}>{`Description`} </Text>}
            {hasDescription() && <Text size={1}> {property.description} </Text>}

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


export default function RentedProperties({ profile }) {

    const modalType = useModalStore((state) => state.modalType);
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const setModalType = useModalStore((state) => state.setModalType);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);

    const [position, setPosition] = useState([]);
    const [address, setAddress] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [selectedProperty, setSelectedProperty] = useState({})

    function openModal(type) {
        setModalType(type);
        toggleIsModalOpen();
    }

    const [properties, setProperties] = useState([]);

    async function fetchProperties() {
        let { data, error } = await getRentedPropertiesOfUser(profile.authID);
        if (data) setProperties(data);
    }

    useEffect(() => {
        fetchProperties();
        return () => {
        };
    }, []);

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    if (getPersistantState(hasPersistance, isViewingAsOwner)) return null;

    function propertyFilteredByInput(property) {
        return property.address.toLowerCase().includes(inputAddress.toLowerCase());
    }


    return (
        <OwnedPropertiesBox>
            <SearchPropertyInput placeholder="address of rented property" spellCheck="false" onChange={(event) => { setInputAddress(event.target.value) }} />
            <PropertyContainer>
                {
                    properties.filter(propertyFilteredByInput).map((property, index) => {
                        return (<PropertySnippet key={property.propertyID}
                            property={property}
                            profile={profile}
                            openModal={openModal}
                            setPosition={setPosition}
                            setAddress={setAddress}
                            setSelectedProperty={setSelectedProperty}
                        />)
                    })
                }
            </PropertyContainer>

            <Modal showModal={showModal(ModalTypes.MapMarkerModal, modalType, isModalOpen, setPosition)}>
                <MoveMapMarkerModal>
                    <Map address={address} position={position} />
                </MoveMapMarkerModal>
            </Modal>

            <Modal showModal={showModal(ModalTypes.RentedPropertyDeleteModal, modalType, isModalOpen, setPosition)}>
                <DeleteRentedPropertyModal property={selectedProperty} profile={profile} />
            </Modal>

        </OwnedPropertiesBox>
    )
}