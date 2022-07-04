import { centerChilds, Text } from "../../styles/Text";
import AddPropertyBox from "../AddPropertyBox/AddPropertyBox";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "../AddPropertyBox/AddPropertyBox.styles";
import { EditPropertyModalContainer } from "./Modals.styles";
import { FaMapMarker, FaMapMarked, FaKey, FaCopy } from 'react-icons/fa'
import { MdDesktopAccessDisabled, MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { useState } from "react";
import { useRouter } from "next/router";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { copyTextToClipboard } from "../../Utils/copy";
const verticallyCenterChilds = { display: "flex", alignItems: "center" };
const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };

export default function EditPropertyModal({ property }) {

    const router = useRouter();

    const [isuploading, setIsuploading] = useState(false);

    const [address, setAddress] = useState(property.address);
    const [description, setDescription] = useState(property.description);
    const [secretKey, setSecretKey] = useState(property.secretKey);

    const textIconButton = {
        ...centerChilds, marginLeft: "auto",
        marginTop: "10px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
    };


    return <EditPropertyModalContainer>
        <AddPropertyBoxContainer>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <FaMapMarked />
                </Text>
                <Input type="text" placeholder="address" spellCheck="false" value={address}
                    onChange={(event) => { setAddress(event.target.value) }}
                />
            </AddPropertyInputBox>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}> <MdOutlineDescription /> </Text>
                <InputArea type="text" placeholder="description (rent, additional info ...)"
                    spellCheck="false" value={description}
                    onChange={(event) => { setDescription(event.target.value) }}
                />
            </AddPropertyInputBox>

            <AddPropertyInputBox>
                <IconTextBox>
                    <Text style={marginedRightText}> {"Generate Secret Key "} </Text>
                    <Text size={1} style={marginedRightText}>
                        <FaKey onClick={() => setSecretKey(getRandomID("KEY"))} />
                    </Text>
                    <Text size={1} style={verticallyCenterChilds}>
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
        </AddPropertyBoxContainer>
    </EditPropertyModalContainer>
}