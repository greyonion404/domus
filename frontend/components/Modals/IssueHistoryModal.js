import { IssueHistoryModalContainer, FlexBox, IssueSnippetContainer } from "./Modals.styles";
import { TiTabsOutline, TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { ISSUE_STATUS } from "../../Utils/issueTypes";

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

    const [retrievedIssues, setRetrievedIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [filterType, setFIlterType] = useState(FILTER_TYPES.ALL);



    async function fetchIssues() {
        const { issues, error } = await getIssuesOfProperty(property.propertyID);
        if (issues) {
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
            setFilteredIssues(retrievedIssues);
        }
        else if (filterType === FILTER_TYPES.CREATED) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.CREATED);
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.SEEN) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.SEEN);
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.ONGOING) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.ONGOING);
            setFilteredIssues(filtered);
        }
        else if (filterType === FILTER_TYPES.CLOSED) {
            filtered = retrievedIssues.filter(issue => issue.currentStatus === FILTER_TYPES.CLOSED);
            setFilteredIssues(filtered);
        }

    }

    useEffect(() => {
        filterIssues();
    }, [filterType]);


    return (
        <IssueHistoryModalContainer>

            <Select options={filterTypes}
                isSearchable={false}
                styles={IssueTypeSelectStyle}
                defaultValue={filterTypes[0]}
                onChange={(selected) => { setFIlterType(selected.value) }}
            />

            <>
                <Text size={2} underline style={{ width: "max-content", maxWidth: "100%", margin: "auto", marginTop: "10px" }}>
                    {`The issues of the property @address : ${JSON.stringify(property.address)} are shown below.`}
                </Text>

                {
                    filteredIssues.map((current, index) => {
                        return (
                            <IssueSnippetContainer key={current.id}>
                                <Text>
                                    {current.title}
                                </Text>
                                <Text>
                                    { getTimeDateString(current.issuedAt)}
                                </Text>
                            </IssueSnippetContainer>
                        )

                    })
                }
            </>
        </IssueHistoryModalContainer>
    )
}