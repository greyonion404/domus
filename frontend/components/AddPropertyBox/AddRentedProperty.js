import { FaKey, FaMapMarked } from "react-icons/fa";
import { useState } from "react";
import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "./AddPropertyBox.styles"
import data from "../../styles/data";
import { MdOutlineDescription } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { addPropertyIdToRenter, getPropertyBySecretKey, updatePropertyRenterID } from "../../Utils/database";
import { AiOutlineUpload } from "react-icons/ai";
import { Router, useRouter } from "next/router";

export default function AddRentedPropertyBox({ profile }) {
    const Router = useRouter();
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
    const [isBusyInQuery, setIsBusyInQuery] = useState(false);
    const [isErrorFindingProperty, setIsErrorFindingProperty] = useState(null);


    async function getAndSetProperty() {
        setIsBusyInQuery(true);
        let { data, error } = await getPropertyBySecretKey(secretKey);
        if (data && data.length !== 0)
        {
            if(data[0].ownerID === profile.authID) 
            {
                setIsErrorFindingProperty("This property is owned by you. Can't add as rented.");
                setIsBusyInQuery(false);
                return;
            }
            
            if(data[0].renterID === profile.authID) 
            {
                setIsErrorFindingProperty("You already added this property before");
                setIsBusyInQuery(false);
                return;
            }

            if(data[0].renterID !== "") 
            {
                setIsErrorFindingProperty("Already there's an renter living in that property");
                setIsBusyInQuery(false);
                return;
            }
            setProperty(data[0]);
        } 
        else setIsErrorFindingProperty("Couldn't find any property with the given Secret Key");
        setIsBusyInQuery(false);
    }
    async function addProperty() {
        setIsBusyInQuery(true);
        let profileResponse = await addPropertyIdToRenter(property.propertyID, profile);
        let updatedPropertyResponse = await updatePropertyRenterID(property.propertyID, profile);
        setIsBusyInQuery(false);
        Router.push('/');
        
    }


    return (
        <AddPropertyBoxContainer>

            <AddPropertyInputBox>
                <Text size={2} style={verticallyCenterChilds}>
                    <FaKey style={marginedRightText} /> Secret Key
                </Text>
                <Input type="text" placeholder="SECRET KEY" spellCheck="false" value={secretKey} onChange={(event) => {
                    setSecretKey(event.target.value);
                    setProperty(null);
                    setIsErrorFindingProperty(false)
                }} />

                {
                    (!property && isErrorFindingProperty) &&
                    <Text underline>{isErrorFindingProperty}</Text>
                }

                {
                    (property && !isErrorFindingProperty) &&
                    <Text underline> {"The property below is found with the given Secret Key"} </Text>
                }
            </AddPropertyInputBox>
            {
                !property &&
                <AddPropertyInputBox>
                    <Text size={2} style={textIconButton} onClick={async () => {
                        await getAndSetProperty();
                    }}>
                        {
                            !isBusyInQuery ?
                                <FaKey /> : <AiOutlineUpload />
                        }
                    </Text>
                </AddPropertyInputBox>
            }

            {
                property &&
                <AddPropertyInputBox>
                    <Text size={1} style={verticallyCenterChilds}>
                        <FaMapMarked />
                    </Text>
                    <Input type="text" placeholder="address" spellCheck="false"
                        value={property.address}
                        onChange={() => { }}
                    />
                </AddPropertyInputBox>
            }
            {
                (property && property.description !== "") &&
                <AddPropertyInputBox>
                    <Text size={1} style={verticallyCenterChilds}> <MdOutlineDescription /> </Text>
                    <InputArea type="text" placeholder="description (rent, additional info ...)"
                        spellCheck="false"
                        value={property.description}
                        onChange={() => { }}
                    />
                </AddPropertyInputBox>
            }
            {
                property &&
                <AddPropertyInputBox>
                    <Text size={2} style={textIconButton} onClick={async () => {
                        await addProperty();
                    }}>
                        {
                            !isBusyInQuery ?
                                <TiTick /> : <AiOutlineUpload />
                        }
                    </Text>
                </AddPropertyInputBox>
            }



        </AddPropertyBoxContainer >
    )
}