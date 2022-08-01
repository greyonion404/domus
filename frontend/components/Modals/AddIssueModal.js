import { centerChilds, Text } from "../../styles/Text";
import { AddPropertyBoxContainer, AddPropertyInputBox, Input, InputArea } from "../AddPropertyBox/AddPropertyBox.styles";
import { AddIssueModalContainer, FlexBox } from "./Modals.styles";
import { FaClock } from 'react-icons/fa'
import { MdOutlineDescription, } from 'react-icons/md'
import { TiTabsOutline, TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { AiOutlineUpload } from "react-icons/ai"
import { addHistoryToDatabase, addIssueToDatabase, updatePropertyByID } from "../../Utils/database";
import { getBangladeshTime, getTimeDateString } from "../../Utils/getBangladeshTime";
import { ISSUE_STATUS } from "../../Utils/issueTypes";

const verticallyCenterChilds = { display: "flex", alignItems: "center" };
const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };

TiTabsOutline

export default function AddIssueModal({ property, profile }) {


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const userID = useUserPreferencesStore((state) => state.userID);



    const [isuploading, setIsuploading] = useState(false);
    const [time, setTime] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function addHistory(issueID, action, message, timestamp)
    {
        let history = {
            historyID : getRandomID('HISTORY'),
            issueID: issueID,
            action: action,
            message: message,
            timestamp: timestamp,
        };
        console.log(history)
        let {data, error} = await addHistoryToDatabase(history);
        console.log(error);
    }

    async function addIssue() {
        let issueID = getRandomID("ISSUE");
        let issue =
        {
            id: issueID,
            createdBy: userID,
            propertyID: property.propertyID,
            title: title,
            description: description,
            currentStatus: ISSUE_STATUS.CREATED,
            rating: null,
            issuedAt: time,
            issueClosedAt: null,
        }



        setIsuploading(true);
        // upload
        console.log(issue);
        let { insertedIssue, insertError } = await addIssueToDatabase(issue);
        await addHistory(issueID, 'created issue', '', time);
        toggleIsModalOpen();
        if (insertedIssue) {
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
        setTime(getBangladeshTime());
    }, [])



    return (
        <AddIssueModalContainer>
            <AddPropertyBoxContainer>
                <AddPropertyInputBox>
                    <FlexBox>
                        <Text size={2} style={marginedRightText}>
                            <TiTabsOutline />
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
                            <FaClock />
                        </Text>
                        <Text size={2} style={verticallyCenterChilds}>
                            {`Issued at `}
                        </Text>
                    </FlexBox>
                    <Text size={1} style={verticallyCenterChilds}>
                        {getTimeDateString(time)}
                    </Text>
                </AddPropertyInputBox>
            </AddPropertyBoxContainer>


            <AddPropertyInputBox>
                <Text size={3} style={updateButtonStyle} onClick={async () => { await addIssue() }}>
                    {isuploading ? <AiOutlineUpload /> : <TiTick />}
                </Text>
            </AddPropertyInputBox>
        </AddIssueModalContainer>
    )
}