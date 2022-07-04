import { FaKey, FaMapMarked } from "react-icons/fa";
import { useState } from "react";
import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "./AddPropertyBox.styles"
import data from "../../styles/data";
import { MdOutlineDescription } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function AddRentedPropertyBox({ profile }) {
    const verticallyCenterChilds = { display: "flex", alignItems: "center" };
    const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };
    const textIconButton = {
        ...centerChilds, marginLeft: "auto",
        marginTop: "10px",
        padding: "10px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
    };

    const [secretKey, setSecretKey] = useState("");
    const [property, setProperty] = useState(null);

    async function addPropertyToProfile()
    {

    }


    return (
        <AddPropertyBoxContainer>
            
            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <FaKey />
                </Text>
                <Input type="text" placeholder="SECRET KEY" spellCheck="false" value={secretKey} onChange={(event) => { setSecretKey(event.target.value); setProperty(null) }} />
            </AddPropertyInputBox>
            {
                !property &&
                <AddPropertyInputBox>
                    <Text size={32} style={textIconButton} onClick={async () => {
                        setProperty({})
                    }}>
                        <FaKey />
                    </Text>
                </AddPropertyInputBox>
            }

            {
                property &&
                <AddPropertyInputBox>
                    <Text size={2} style={verticallyCenterChilds}>
                        <FaMapMarked />
                    </Text>
                    <Input type="text" placeholder="address" spellCheck="false"
                        value={"address"}
                        onChange={() => { }}
                    />
                </AddPropertyInputBox>
            }
            {
                (property && property.description !== "") &&
                <AddPropertyInputBox>
                    <Text size={2} style={verticallyCenterChilds}> <MdOutlineDescription /> </Text>
                    <InputArea type="text" placeholder="description (rent, additional info ...)"
                        spellCheck="false"
                        value={"description"}
                        onChange={() => { }}
                    />
                </AddPropertyInputBox>
            }
            {
                property &&
                <AddPropertyInputBox>
                    <Text size={3} style={textIconButton} onClick={async () => {
                    }}>
                        <TiTick />
                    </Text>
                </AddPropertyInputBox>
            }


        </AddPropertyBoxContainer >
    )
}