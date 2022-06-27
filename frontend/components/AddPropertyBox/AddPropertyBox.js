import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "./AddPropertyBox.styles";
import { FaMapMarker, FaMapMarked, FaKey, FaCopy } from 'react-icons/fa'
import { MdDesktopAccessDisabled, MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { useState } from "react";
import data from "../../styles/data";
import { getRandomID } from "../../Utils/random";
import { copyTextToClipboard } from "../../Utils/copy,js";
import { getPersistantState, useMapStore, useModalStore, useStorePersistance, useUserPreferencesStore } from "../../store";
import { ModalTypes, showModal } from "../../Utils/useModal";
import Modal from "../Modal/Modal";
import Map from '../../components/Map/index'
import MoveMapMarkerModal from "../Modals/MoveMapMarkerModal";
import { addPropertyToDatabase } from "../../Utils/database";
import Loader from "../Modal/Loader";
import { useRouter } from "next/router";



function RenterPrompt() {


    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };


    return <>
        <AddPropertyBoxContainer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text size={1} style={verticallyCenterChilds}>
                <MdDesktopAccessDisabled style={marginedRightText} />
                {"Viewing as renter, can't add property"}
            </Text>
        </AddPropertyBoxContainer>
    </>

}




export default function AddPropertyBox({ profile }) {

    const router = useRouter();

    const [isuploading, setIsuploading] = useState(false);

    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [secretKey, setSecretKey] = useState(getRandomID("KEY"));

    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };
    const textIconButton = {
        ...centerChilds, marginLeft: "auto",
        marginTop: "10px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
    };
    const markerPosition = useMapStore((state) => state.markerPosition);


    const modalType = useModalStore((state) => state.modalType);
    const setModalType = useModalStore((state) => state.setModalType);

    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);

    function openModal(type) {
        setModalType(type);
        toggleIsModalOpen();

    }


    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);


    async function addProperty() {

        let property =
        {
            propertyID: getRandomID("PROPERTY"),
            propertySecretKey: secretKey,
            address: address,
            description: description,
            latitude: markerPosition.lat,
            longitude: markerPosition.lng,
            ownerID: profile.authID,
            renterID: "",
        };
        setIsuploading(true);
        let response = await addPropertyToDatabase(property);
        setIsuploading(false);
        if (response.insertedProperty) router.push('/');
    }
    if (!getPersistantState(hasPersistance, isViewingAsOwner)) return <RenterPrompt />

    if (isuploading)
        return <Loader prompt={"adding property to dashboard."} />







    return (
        <AddPropertyBoxContainer>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <FaMapMarked />
                </Text>
                <Input type="text" placeholder="address" spellCheck="false"
                    onChange={(event) => { setAddress(event.target.value) }}
                />
            </AddPropertyInputBox>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}> <MdOutlineDescription /> </Text>
                <InputArea type="text" placeholder="description (rent, additional info ...)"
                    spellCheck="false"
                    onChange={(event) => { setDescription(event.target.value) }}
                />
            </AddPropertyInputBox>

            <AddPropertyInputBox>
                <IconTextBox>
                    <Text style={marginedRightText}> {"Generate Secret Key "} </Text>
                    <Text size={2} style={marginedRightText}>
                        <FaKey onClick={() => setSecretKey(getRandomID("KEY"))} />
                    </Text>
                    <Text size={2} style={verticallyCenterChilds}>
                        <FaCopy onClick={async () => { await copyTextToClipboard(secretKey) }} />
                    </Text>
                </IconTextBox>
                <Input type="text" placeholder="SECRET KEY" spellCheck="false" value={secretKey} onChange={() => { }} />
            </AddPropertyInputBox>


            <AddPropertyInputBox>
                <IconTextBox>
                    <Text style={marginedRightText}> {"Pin exact location (optional) "} </Text>
                    <Text size={2} style={verticallyCenterChilds}>
                        <FaMapMarker onClick={() => openModal(ModalTypes.MoveMapMarkerModal)} />
                    </Text>
                </IconTextBox>
            </AddPropertyInputBox>


            <AddPropertyInputBox>
                <Text size={3} style={textIconButton} onClick={async () => {
                    await addProperty();
                }}>
                    <TiTick />
                </Text>
            </AddPropertyInputBox>



            <Modal showModal={showModal(ModalTypes.MoveMapMarkerModal, modalType, isModalOpen)}>
                <MoveMapMarkerModal>
                    <Map draggable={true} address={address} />
                </MoveMapMarkerModal>
            </Modal>


        </AddPropertyBoxContainer>
    )
}
