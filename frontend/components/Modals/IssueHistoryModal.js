import { IssueHistoryModalContainer, FlexBox } from "./Modals.styles";
import { TiTabsOutline, TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { ISSUE_STATUS } from "../../Utils/issueTypes";

import Select from 'react-select'
import { Text } from "../../styles/Text";
import { getIssuesOfProperty } from "../../Utils/database";

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
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? data.styles.color.primary : data.styles.color.primaryMedium,
        color: data.styles.color.text.lightest,
    }),
    menu: base => ({
        ...base, background: data.styles.color.primaryMedium,
    }),
    control: styles => ({
        ...styles,
        backgroundColor: data.styles.color.primaryMedium,
        color: data.styles.color.text.lightest,
        border: "none",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: data.styles.color.text.lightest,
        textAlign: "center",
    })

}


export default function IssueHistoryModal({ property, profile }) {


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const userID = useUserPreferencesStore((state) => state.userID);

    const [retrievedIssues, setRetrievedIssues] = useState([]);


    async function fetchIssues() {
        const { issues, error } = await getIssuesOfProperty(property.propertyID);
        if (issues) setRetrievedIssues(issues);
    }

    useEffect(() => {
        fetchIssues();
        return () => {
        }

    }, []);

    function filterIssues(issues) {
        let filtered = issues.filter(issue => issue.id === "ISSUE_b889ee13-08c6-4cfa-aa4f-1583953d8b9f")
        console.log(filtered);
        return filtered;
    }

    return (
        <IssueHistoryModalContainer>
       
                <Select options={filterTypes}
                    isSearchable={false}
                   
                    styles={IssueTypeSelectStyle}
                    defaultValue={filterTypes[0]}
                    onChange={(selected) => { }}
                />

                <>
                    <Text size={2} underline style={{ width: "max-content", maxWidth: "100%", margin: "auto", marginTop: "10px" }}>
                        {`The issues of the property @address : ${JSON.stringify(property.address)} are shown below.`}
                    </Text>
                    {/* <Text size={1}>
                        {JSON.stringify(retrievedIssues)};
                    </Text> */}

                    {
                        filterIssues(retrievedIssues).map((current, index) => {
                            return (
                                <Text>
                                    {current.id}
                                </Text>
                            )

                        })
                    }
                </>
        </IssueHistoryModalContainer>
    )
}