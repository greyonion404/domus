import { centerChilds, Text } from "../../styles/Text";
import AddPropertyBox from "../AddPropertyBox/AddPropertyBox";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "../AddPropertyBox/AddPropertyBox.styles";
import { EditingMapBox, EditPropertyModalContainer, FlexBox, MapBox } from "./Modals.styles";
import { FaMapMarker, FaMapMarked, FaKey, FaCopy, FaInfo } from 'react-icons/fa'
import { MdDesktopAccessDisabled, MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { copyTextToClipboard } from "../../Utils/copy";
import { Box } from "../../styles/Page";
import Map from '../Map/index'
import { defaultPosition } from "../../Utils/defaultPosition";
import { isEqualFloat } from "../../Utils/floatComparison";
import { useMapStore } from "../../store";
import { AiOutlineWarning } from "react-icons/ai"

const verticallyCenterChilds = { display: "flex", alignItems: "center" };
const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };



export default function EditPropertyModal({ property }) {

    const setMarkerPosition = useMapStore((state) => state.setMarkerPosition);
    const markerPosition = useMapStore((state) => state.markerPosition);

    function getPosition() {
        if (isEqualFloat(property.latitude, 0) && isEqualFloat(property.longitude, 0)) setMarkerPosition(defaultPosition);
        else setMarkerPosition({ lat: property.latitude, lng: property.longitude });
    }

    useEffect(() => {
        getPosition();
    }, [])

    const router = useRouter();
    const [isuploading, setIsuploading] = useState(false);
    const [isEditingMap, setIsEditingMap] = useState(false);
    const [address, setAddress] = useState(property.address);
    const [description, setDescription] = useState(property.description);
    const [secretKey, setSecretKey] = useState(property.propertySecretKey);

    const updateButtonStyle = {
        ...centerChilds, margin: "auto",
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: "5px",
        backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
        zIndex: "100"
    };

    const tabStyle = {
        display: "flex", width: "50%", justifyContent: "space-around", alignItems: "center",
        padding: "10px",
        border: `1px solid ${data.styles.color.primaryMedium}`,
    }
    const selectedTabStyle =
    {
        ...tabStyle,
        backgroundColor: data.styles.color.primaryMedium,
    }

    return (
        <EditPropertyModalContainer>
            <FlexBox>
                <Box style={isEditingMap ? tabStyle : selectedTabStyle} onClick={() => { setIsEditingMap(false) }}>
                    <Text size={3} style={verticallyCenterChilds}>
                        <FaInfo />
                    </Text>
                </Box>
                <Box style={isEditingMap ? selectedTabStyle : tabStyle} onClick={() => { setIsEditingMap(true) }}>
                    <Text size={3} style={verticallyCenterChilds}>
                        <FaMapMarker />
                    </Text>
                </Box>
            </FlexBox>
            {
                !isEditingMap &&
                <AddPropertyBoxContainer>
                    <AddPropertyInputBox>
                        <FlexBox>
                            <Text size={2} style={marginedRightText}>
                                <FaMapMarked />
                            </Text>
                            <Text size={2} style={verticallyCenterChilds}>
                                Address
                            </Text>
                        </FlexBox>
                        <Input type="text" placeholder="address" spellCheck="false" value={address}
                            onChange={(event) => { setAddress(event.target.value) }}
                        />
                    </AddPropertyInputBox>

                    <AddPropertyInputBox>
                        <FlexBox>
                            <Text size={2} style={marginedRightText}>
                                <MdOutlineDescription />
                            </Text>
                            <Text size={2} style={verticallyCenterChilds}>
                                Description
                            </Text>
                        </FlexBox>
                        <InputArea type="text" placeholder="description (rent, additional info ...)"
                            spellCheck="false" value={description}
                            onChange={(event) => { setDescription(event.target.value) }}
                        />
                    </AddPropertyInputBox>

                    <AddPropertyInputBox>
                        <IconTextBox>
                            <Text style={marginedRightText}> {"Regenerate Secret Key (Evict renter) "} </Text>
                            <Text size={1} style={marginedRightText}>
                                <FaKey onClick={() => setSecretKey(getRandomID("KEY"))} />
                            </Text>
                           
                            <Text size={1} style={verticallyCenterChilds}>
                                <AiOutlineWarning />
                            </Text>
                        </IconTextBox>
                        <Input type="text" placeholder="SECRET KEY" spellCheck="false" value={secretKey} onChange={() => { }} />
                    </AddPropertyInputBox>
                </AddPropertyBoxContainer>
            }
            {
                isEditingMap &&
                <EditingMapBox>
                    <Text>Change Location</Text>
                    <Map address={address} position={markerPosition} draggable={true} />
                </EditingMapBox>
            }

            <AddPropertyInputBox>
                <Text size={3} style={updateButtonStyle} onClick={async () => { }}>
                    <TiTick />
                </Text>
            </AddPropertyInputBox>
        </EditPropertyModalContainer>
    )
}