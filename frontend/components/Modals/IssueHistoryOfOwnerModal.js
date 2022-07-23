import { IssueHistoryOfOwnerModalContainer, FlexBox, IssueSnippetContainer, IssueSnippetsContainer } from "./Modals.styles";
import { TiArrowBack, TiTick, TiUploadOutline } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { ISSUE_STATUS } from "../../Utils/issueTypes";
import { AiOutlineReload, AiOutlineUpload } from 'react-icons/ai'
import Select from 'react-select'
import { centerChilds, Text } from "../../styles/Text";
import { getIssuesOfProperty } from "../../Utils/database";
import { getTimeDateString } from "../../Utils/getBangladeshTime";
import { Box } from "../../styles/Page";
import { FaHistory, FaMapMarker } from "react-icons/fa";
import { AiFillCaretUp } from 'react-icons/ai';
import { AddPropertyInputBox, InputArea } from "../AddPropertyBox/AddPropertyBox.styles";
import { MdOutlineDescription } from "react-icons/md";


const filterTypes = [
    { value: 'ALL', label: '🔎 All issues' },
    { value: ISSUE_STATUS.CREATED, label: '➕ Created issues' },
    { value: ISSUE_STATUS.SEEN, label: '👁️‍🗨️ Seen by owner' },
    { value: ISSUE_STATUS.ONGOING, label: '🔨 Ongoing issues' },
    { value: ISSUE_STATUS.CLOSED, label: '❌ Closed issues' },
];

const issueTypes = [
    { value: ISSUE_STATUS.SEEN, label: '👁️‍🗨️ Seen' },
    { value: ISSUE_STATUS.ONGOING, label: '🔨 Ongoing' },
    { value: ISSUE_STATUS.CLOSED, label: '❌ Closed' },
];


const PAGE_TYPES =
{
    SNIPPET: 'SNIPPET',
    UPDATE: 'UPDATE',
    HISTORY: 'HISTORY',
};
const verticallyCenterChilds = { display: "flex", alignItems: "center" };
const marginedRightText = { ...verticallyCenterChilds, marginRight: "10px" };

const updateButtonStyle = {
    ...centerChilds, margin: "auto",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: "5px",
    backgroundColor: data.styles.color.secondaryMedium, width: "max-content",
    zIndex: "100"
};

const IssueTypeSelectStyle = {
    menuList: styles => ({
        ...styles, background: data.styles.color.primaryMedium,
        minWidth: "max-content",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? data.styles.color.primary : data.styles.color.primaryMedium,
        color: data.styles.color.text.lightest,
        minWidth: "max-content",
    }),
    menu: base => ({
        ...base, background: data.styles.color.primaryMedium,
        minWidth: "max-content",
        width: "40%",
    }),
    control: styles => ({
        ...styles,
        backgroundColor: data.styles.color.primaryMedium,
        color: data.styles.color.text.lightest,
        border: "none",
        minWidth: "max-content",
        maxWidth: "max-content"
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: data.styles.color.text.lightest,
        textAlign: "center",
        minWidth: "max-content",
    })

}

const FILTER_TYPES =
{
    ...ISSUE_STATUS,
    ALL: "ALL",
}

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

export default function IssueHistoryOfOwnerModal({ property, profile }) {


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const userID = useUserPreferencesStore((state) => state.userID);

    const [retrievedIssues, setRetrievedIssues] = useState(null);
    const [filteredIssues, setFilteredIssues] = useState(null);
    const [filterType, setFIlterType] = useState(FILTER_TYPES.ALL);
    const [currentIssueTypes, setCurrentIssueTypes] = useState(FILTER_TYPES.ALL);

    const [pageType, setPageType] = useState(PAGE_TYPES.SNIPPET);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isuploading, setIsuploading] = useState(false);
    const [message, setMessage] = useState("");





    async function fetchIssues() {
        const { issues, error } = await getIssuesOfProperty(property.propertyID);
        if (issues) {
            issues.sort(function (a, b) { return b.issuedAt - a.issuedAt })
            setRetrievedIssues(issues);
            setFilteredIssues(issues);
        }
    }


    useEffect(() => {
        fetchIssues();
        return () => {
        }

    }, []);

    function filterIssues() {
        let filtered;
        if (filterType === FILTER_TYPES.ALL) {
            filtered = retrievedIssues;
            filtered?.sort(function (a, b) { return b.issuedAt - a.issuedAt });
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.CREATED) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.CREATED);
            filtered.sort(function (a, b) { return b.issuedAt - a.issuedAt });
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.SEEN) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.SEEN);
            filtered.sort(function (a, b) { return b.issuedAt - a.issuedAt });
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.ONGOING) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.ONGOING);
            filtered.sort(function (a, b) { return b.issuedAt - a.issuedAt });
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.CLOSED) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.CLOSED);
            filtered.sort(function (a, b) { return b.issuedAt - a.issuedAt });
            setFilteredIssues(filtered);
        }

    }

    useEffect(() => {
        filterIssues();
    }, [filterType]);

    useEffect(() => {
        if (selectedIssue) {
            if (selectedIssue.currentStatus === ISSUE_STATUS.CREATED)
                setCurrentIssueTypes([issueTypes[0], issueTypes[1], issueTypes[2]]);

            if (selectedIssue.currentStatus === ISSUE_STATUS.SEEN)
                setCurrentIssueTypes([issueTypes[1], issueTypes[2]]);

            if (selectedIssue.currentStatus === ISSUE_STATUS.ONGOING)
                setCurrentIssueTypes([issueTypes[1], issueTypes[2]]);

            if (selectedIssue.currentStatus === ISSUE_STATUS.CLOSED)
                setCurrentIssueTypes([issueTypes[1]]);

        }
    }, [selectedIssue])




    return (
        <IssueHistoryOfOwnerModalContainer>

            {/* snippet */}
            {
                (pageType === PAGE_TYPES.SNIPPET) &&
                <>
                    <Select options={filterTypes}
                        isSearchable={false}
                        styles={IssueTypeSelectStyle}
                        defaultValue={filterTypes[0]}
                        onChange={(selected) => { setFIlterType(selected.value) }}
                    />
                    <Text size={2} underline style={{ width: "max-content", maxWidth: "100%", margin: "auto", marginTop: "10px" }}>
                        {`The issues of the property @address : ${JSON.stringify(property.address)} are shown below.`}
                    </Text>

                    <IssueSnippetsContainer>
                        {
                            filteredIssues &&
                            filteredIssues.map((current, index) => {
                                return (
                                    <IssueSnippetContainer key={current.id} onClick={() => { setSelectedIssue(current); setPageType(PAGE_TYPES.UPDATE) }}>
                                        <Text>
                                            {index + 1}. {current.title}
                                        </Text>
                                        <Text>
                                            {getTimeDateString(current.issuedAt)}
                                        </Text>
                                    </IssueSnippetContainer>
                                )

                            })
                        }
                        {
                            !filteredIssues &&
                            <Text size={3} underline style={{ width: "max-content", maxWidth: "100%", margin: "auto", marginTop: "10px" }}>
                                <AiOutlineReload />
                            </Text>
                        }
                    </IssueSnippetsContainer>
                </>
            }

            {/* update */}
            {
                (pageType === PAGE_TYPES.UPDATE) &&
                <>
                    <FlexBox>
                        <Text size={2} style={{ width: "max-content", maxWidth: "100%" }}>
                            <TiArrowBack onClick={() => { setPageType(PAGE_TYPES.SNIPPET); setFIlterType(FILTER_TYPES.ALL); setSelectedIssue(null) }} />
                        </Text>
                    </FlexBox>
                    <FlexBox>
                        <Box style={(pageType === PAGE_TYPES.UPDATE) ? selectedTabStyle : tabStyle} onClick={() => { setPageType(PAGE_TYPES.UPDATE); }}>
                            <Text size={3} style={verticallyCenterChilds}>
                                <AiFillCaretUp />
                            </Text>
                        </Box>
                        <Box style={(pageType === PAGE_TYPES.UPDATE) ? tabStyle : selectedTabStyle} onClick={() => { setPageType(PAGE_TYPES.HISTORY); }}>
                            <Text size={3} style={verticallyCenterChilds}>
                                <FaHistory />
                            </Text>
                        </Box>
                    </FlexBox>


                    <AddPropertyInputBox style={{ marginTop: "10px" }}>
                        <Select options={currentIssueTypes}
                            isSearchable={false}
                            styles={IssueTypeSelectStyle}
                            defaultValue={currentIssueTypes[0]}
                            onChange={(selected) => { }}
                        />
                        <FlexBox>
                            <Text size={1} style={marginedRightText}>
                                <MdOutlineDescription />
                            </Text>
                            <Text size={1} style={{ ...verticallyCenterChilds, marginRight: "10px" }}>
                                Update Issue
                            </Text>
                        </FlexBox>
                        <InputArea type="text" placeholder="message to renter (optional) ..."
                            spellCheck="false" value={message}
                            onChange={(event) => { setMessage(event.target.value) }}
                        />
                    </AddPropertyInputBox>

                    <AddPropertyInputBox>
                        <Text size={3} style={updateButtonStyle} onClick={async () => { }}>
                            {isuploading ? <AiOutlineUpload /> : <TiTick />}
                        </Text>
                    </AddPropertyInputBox>
                </>
            }

            {/* History */}
            {
                (pageType === PAGE_TYPES.HISTORY) &&
                <>
                    <FlexBox>
                        <Text size={2} style={{ width: "max-content", maxWidth: "100%" }}>
                            <TiArrowBack onClick={() => { setPageType(PAGE_TYPES.SNIPPET); setSelectedIssue(null) }} />
                        </Text>
                    </FlexBox>
                    <FlexBox>
                        <Box style={(pageType === PAGE_TYPES.HISTORY) ? tabStyle : selectedTabStyle} onClick={() => { setPageType(PAGE_TYPES.UPDATE); }}>
                            <Text size={3} style={verticallyCenterChilds}>
                                <AiFillCaretUp />
                            </Text>
                        </Box>
                        <Box style={(pageType === PAGE_TYPES.HISTORY) ? selectedTabStyle : tabStyle} onClick={() => { setPageType(PAGE_TYPES.HISTORY); }}>
                            <Text size={3} style={verticallyCenterChilds}>
                                <FaHistory />
                            </Text>
                        </Box>
                    </FlexBox>




                    <AddPropertyInputBox>
                        <FlexBox>
                            <Text size={1} style={marginedRightText}>
                                <MdOutlineDescription />
                            </Text>
                            <Text size={1} style={verticallyCenterChilds}>
                                Title :  {selectedIssue.title}
                            </Text>
                        </FlexBox>
                    </AddPropertyInputBox>


                    {
                        selectedIssue.description !== "" &&
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
                                spellCheck="false" value={selectedIssue.description}
                                onChange={(event) => { }}
                            />
                        </AddPropertyInputBox>
                    }
                </>

            }

        </IssueHistoryOfOwnerModalContainer >
    )
}