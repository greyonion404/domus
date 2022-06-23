import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, Input, InputArea } from "./AddPropertyBox.styles";
import { FaMapMarker, FaMapMarked, FaKey } from 'react-icons/fa'
import { MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'

import { useState } from "react";
import data from "../../styles/data";

export default function AddPropertyBox({ profile }) {

    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };
    const textIconButton = {
        ...centerChilds, marginLeft: "auto",
        marginTop: "10px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content"
    };

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
                    onChange={(event) => { setAddress(event.target.value) }}
                />
            </AddPropertyInputBox>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <Text style={marginedRightText}> {"Generate Secret Key "} </Text>
                    <FaKey />
                </Text>
                <Input type="text" placeholder="SECRET KEY" spellCheck="false" value={secretKey} />
            </AddPropertyInputBox>


            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <Text style={marginedRightText}> {"Pin exact location (optional) "} </Text>
                    <FaMapMarker />
                </Text>
            </AddPropertyInputBox>


            <AddPropertyInputBox>
                <Text size={3} style={textIconButton}>
                    <TiTick />
                </Text>
            </AddPropertyInputBox>




        </AddPropertyBoxContainer>
    )
}
