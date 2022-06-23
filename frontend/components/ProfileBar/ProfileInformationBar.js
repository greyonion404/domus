
import { useUserPreferencesStore, useStorePersistance, getPersistantState, useModalStore } from "../../store"
import { centerChilds, Text } from "../../styles/Text";
import ChangeNameModal from "../Modals/ChangeNameModal";
import { BiHash } from "react-icons/bi";



import { ProfileBar, ProfileImage, ConvertButton } from "./ProfileInformationBar.style";

import Modal from '../Modal/Modal'
import { AiFillEye } from "react-icons/ai";



export default function ProfileInformationBar({ profile }) {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    const toggleViewerMode = useUserPreferencesStore((state) => state.toggleViewerMode);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);






    return (
        <ProfileBar>
            <ProfileImage src={profile.authUser.picture} alt={profile.authUser.nickname} onClick={toggleIsModalOpen} />
            <Text size={1} style={centerChilds} onClick={toggleIsModalOpen}> <BiHash/> {profile.name}</Text>
            <ConvertButton onClick={() => { getPersistantState(hasPersistance, toggleViewerMode)() }}>
                <Text size={1} style={centerChilds}>
                    <AiFillEye />
                    {getPersistantState(hasPersistance, isViewingAsOwner) ? " View as Renter" : " View as Owner"}
                </Text>
            </ConvertButton>
            <Modal>
                <ChangeNameModal profile={profile} />
            </Modal>
            {/* <Modal>
            </Modal> */}
        </ProfileBar>
    )
}
