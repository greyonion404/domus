
import { useUserPreferencesStore, useStorePersistance, getPersistantState, useModalStore } from "../../store"
import { centerChilds, Text } from "../../styles/Text";
import ChangeNameModal from "../Modals/ChangeNameModal";
import { BiHash } from "react-icons/bi";


import { ProfileBar, ProfileImage, ConvertButton } from "./ProfileInformationBar.style";

import Modal from '../Modal/Modal'
import { AiFillEye } from "react-icons/ai";
import { useModal } from "../../Utils/useModal";



export default function ProfileInformationBar({ profile }) {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    const toggleViewerMode = useUserPreferencesStore((state) => state.toggleViewerMode);



    const { openModal, closeModal, showModal, ModalTypes } = useModal();

    console.log(openModal);


    return (
        <ProfileBar>
            <ProfileImage src={profile.authUser.picture} alt={profile.authUser.nickname} onClick={openModal(ModalTypes.ChaneNameModal)} />
            <Text size={1} style={centerChilds} onClick={openModal(ModalTypes.ChangeNameModal)}> <BiHash /> {profile.name}</Text>
            <ConvertButton onClick={() => { getPersistantState(hasPersistance, toggleViewerMode)() }}>
                <Text size={1} style={centerChilds}>
                    <AiFillEye />
                    {getPersistantState(hasPersistance, isViewingAsOwner) ? " View as Renter" : " View as Owner"}
                </Text>
            </ConvertButton>

            <Modal showModal={showModal(ModalTypes.ChaneNameModal)}>
                <ChangeNameModal profile={profile} />
            </Modal>

        </ProfileBar>
    )
}
