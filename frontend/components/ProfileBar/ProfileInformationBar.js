import { useState } from "react";

import { useUserPreferencesStore, useStorePersistance, getPersistantState, useModalStore } from "../../store"
import { Text } from "../../styles/Text";
import ChangeNameModal from "../Modals/ChangeNameModal";

import { ProfileBar, ProfileImage, ConvertButton } from "./ProfileInformationBar.style";

import Modal from '../Modal/Modal'



export default function ProfileInformationBar({ profile }) {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    const toggleViewerMode = useUserPreferencesStore((state) => state.toggleViewerMode);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);






    return (
        <ProfileBar>
            <ProfileImage src={profile.authUser.picture} alt={profile.authUser.nickname} onClick={toggleIsModalOpen} />
            <Text size={1} onClick={toggleIsModalOpen}>{profile.authUser.nickname}</Text>
            <ConvertButton onClick={() => { getPersistantState(hasPersistance, toggleViewerMode)() }}>
                <Text size={1}>
                    {getPersistantState(hasPersistance, isViewingAsOwner) ? "View as Renter" : "View as Owner"}
                </Text>
            </ConvertButton>
            <Modal>
                <ChangeNameModal />
            </Modal>
            {/* <Modal>
            </Modal> */}
        </ProfileBar>
    )
}
