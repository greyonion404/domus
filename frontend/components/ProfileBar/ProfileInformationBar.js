import { useUserPreferencesStore, useStorePersistance, getPersistantState } from "../../store"
import { Text } from "../../styles/Text";
import { ProfileBar, ProfileImage, ConvertButton } from "./ProfileInformationBar.style";




export default function ProfileInformationBar({ profile }) {

    const hasPersistance = useStorePersistance();
    const isViewingAsOwner = useUserPreferencesStore((state) => state.isViewingAsOwner);

    const toggleViewerMode = useUserPreferencesStore((state) => state.toggleViewerMode);


    return (
        <ProfileBar>
            <ProfileImage src={profile.authUser.picture} alt={profile.authUser.nickname} />
            <Text>{profile.authUser.nickname}</Text>
            <ConvertButton onClick={() => { getPersistantState(hasPersistance, toggleViewerMode)() }}>
                <Text size={1}>
                    {getPersistantState(hasPersistance, isViewingAsOwner) ? "View as Renter" : "View as Owner"}
                </Text>
            </ConvertButton>
        </ProfileBar>
    )
}
