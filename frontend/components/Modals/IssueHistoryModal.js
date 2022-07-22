import { IssueHistoryModalContainer, FlexBox } from "./Modals.styles";
import { TiTabsOutline, TiTick } from 'react-icons/ti'
import { useEffect, useState } from "react";
import { getRandomID } from "../../Utils/random";
import data from "../../styles/data";
import { useModalStore, useUserPreferencesStore } from "../../store";
import { ISSUE_STATUS } from "../../Utils/issueTypes";

import Select from 'react-select'

const options = [
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







    return (
        <IssueHistoryModalContainer>
            <Select options={options}
                isSearchable={false}
                styles={IssueTypeSelectStyle}
                defaultValue={options[0]}
                onChange={(selected) => { console.log(selected); }}
            />
        </IssueHistoryModalContainer>
    )
}