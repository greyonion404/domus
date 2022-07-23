import { IssueHistoryModalContainer, FlexBox, IssueSnippetContainer, IssueSnippetsContainer } from "./Modals.styles";
import { TiArrowBack, TiUploadOutline } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { ISSUE_STATUS } from "../../Utils/issueTypes";
import { AiOutlineReload } from 'react-icons/ai'
import Select from 'react-select'
import { Text } from "../../styles/Text";
import { getIssuesOfProperty } from "../../Utils/database";
import { getTimeDateString } from "../../Utils/getBangladeshTime";
const filterTypes = [
    { value: 'ALL', label: '🔎 All issues' },
    { value: ISSUE_STATUS.CREATED, label: '➕ Created issues' },
    { value: ISSUE_STATUS.SEEN, label: '👁️‍🗨️ Seen by owner' },
    { value: ISSUE_STATUS.ONGOING, label: '🔨 Ongoing issues' },
    { value: ISSUE_STATUS.CLOSED, label: '❌ Closed issues' },
];

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


export default function IssueHistoryModal({ property, profile }) {


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const userID = useUserPreferencesStore((state) => state.userID);

    const [retrievedIssues, setRetrievedIssues] = useState(null);
    const [filteredIssues, setFilteredIssues] = useState(null);
    const [filterType, setFIlterType] = useState(FILTER_TYPES.ALL);
    const [selectedIssue, setSelectedIssue] = useState(null);




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

    


    return (
        <IssueHistoryModalContainer>
            {
                !selectedIssue &&
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
                                    <IssueSnippetContainer key={current.id} onClick={() => { setSelectedIssue(current) }}>
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
            {
                selectedIssue &&
                <>
                    <FlexBox>
                        <Text size={2}>
                            <TiArrowBack onClick={() => { setSelectedIssue(null) }} />
                        </Text>
                    </FlexBox>
                    <Text>
                        {selectedIssue.title}
                    </Text>
                    <Text>
                        {selectedIssue.description}
                    </Text>
                </>
            }

        </IssueHistoryModalContainer>
    )
}