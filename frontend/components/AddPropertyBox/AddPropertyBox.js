import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "./AddPropertyBox.styles";
import { FaMapMarker, FaMapMarked, FaKey, FaCopy } from 'react-icons/fa'
import { MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { useState } from "react";
import data from "../../styles/data";
import { getRandomID } from "../../Utils/random";
import { copyTextToClipboard } from "../../Utils/copy,js";
import { useModalStore } from "../../store";




export default function AddPropertyBox({ profile }) {

    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };
    const textIconButton = {
        ...centerChilds, marginLeft: "auto",
        marginTop: "10px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
    };

    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);


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
                        <FaMapMarker onClick={toggleIsModalOpen} />
                    </Text>
                </IconTextBox>
            </AddPropertyInputBox>


            <AddPropertyInputBox>
                <Text size={3} style={textIconButton}>
                    <TiTick />
                </Text>
            </AddPropertyInputBox>




        </AddPropertyBoxContainer>
    )
}
