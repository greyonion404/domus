import { centerChilds, Text } from "../../styles/Text";
import AddPropertyBox from "../AddPropertyBox/AddPropertyBox";
import { AddPropertyBoxContainer, AddPropertyInputBox, IconTextBox, Input, InputArea } from "../AddPropertyBox/AddPropertyBox.styles";
import { AddIssueModalContainer, EditingMapBox, EditPropertyModalContainer, FlexBox, MapBox } from "./Modals.styles";
import { FaMapMarker, FaMapMarked, FaKey, FaCopy, FaInfo, FaUpload } from 'react-icons/fa'
import { MdDesktopAccessDisabled, MdOutlineDescription } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { Box } from "../../styles/Page";
import Map from '../Map/index'
import { defaultPosition } from "../../Utils/defaultPosition";
import { isEqualFloat } from "../../Utils/floatComparison";
import { useMapStore, useModalStore, useUserPreferencesStore } from "../../store";
import { AiOutlineWarning, AiOutlineUpload } from "react-icons/ai"
import { updatePropertyByID } from "../../Utils/database";

const verticallyCenterChilds = { display: "flex", alignItems: "center" };
const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };



export default function AddIssueModal({ property, profile }) {


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);




    // const router = useRouter();
    const [isuploading, setIsuploading] = useState(false);
    const [time, setTime] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [secretKey, setSecretKey] = useState(property.propertySecretKey);

    async function addIssue() {


        setIsuploading(true);
        // upload
        toggleIsModalOpen();
        if (updatedProperty) {
            window.location.reload(false);
        }
        setIsuploading(false);

    }

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

    useEffect(() => {
        let currentTime = new Date().getTime();
        setTime(currentTime);
    }, [])



    return (
        <AddIssueModalContainer>



            <AddPropertyBoxContainer>
                <AddPropertyInputBox>
                    <FlexBox>
                        <Text size={2} style={marginedRightText}>
                            <FaMapMarked />
                        </Text>
                        <Text size={2} style={verticallyCenterChilds}>
                            Issue Title
                        </Text>
                    </FlexBox>
                    <Input type="text" placeholder="issue title ..." spellCheck="false" value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
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
                    <InputArea type="text" placeholder="description of the isssue you are facing ..."
                        spellCheck="false" value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
                </AddPropertyInputBox>

                <AddPropertyInputBox>
                    <FlexBox>
                        <Text size={2} style={marginedRightText}>
                            <MdOutlineDescription />
                        </Text>
                        <Text size={2} style={verticallyCenterChilds}>
                            {`Issued at `}
                        </Text>
                    </FlexBox>
                    <Text size={1} style={verticallyCenterChilds}>
                        {new Date(time).toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </Text>
                </AddPropertyInputBox>
            </AddPropertyBoxContainer>


            <AddPropertyInputBox>
                <Text size={3} style={updateButtonStyle} onClick={async () => { }}>
                    {isuploading ? <AiOutlineUpload /> : <TiTick />}
                </Text>
            </AddPropertyInputBox>
        </AddIssueModalContainer>
    )
}