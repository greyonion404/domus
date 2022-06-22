import { useEffect, useState } from "react";
import { getPersistantState, useStorePersistance, useUserPreferencesStore } from "../../store";
import { Text } from "../../styles/Text"
import { getUserWithAuth0ID } from "../../Utils/database";
import { GenericModal, LoadingModalContainer, ProfileImage } from "./Modals.styles"






export default function ChangeNameModal() {
    const userID = useUserPreferencesStore((state) => state.userID);
    const [user, setUser] = useState(null);

    async function fetchUser() {
        let fetchedUser = await getUserWithAuth0ID(userID);
        setUser(fetchedUser.data[0]);
    }
    fetchUser();
    useEffect(() => {
        return () => {
            console.log("This will be logged on unmount");
        };
    }, [])

    if (user) {
        return (
            <GenericModal>
                <ProfileImage src={user?.authUser.picture} alt={user?.authUser.nickname} />
                <Text>
                    {JSON.stringify(user)}
                </Text>
            </GenericModal>

        )
    }

    return <LoadingModalContainer>
        <Text>
            Loading ...
        </Text>
    </LoadingModalContainer>




}