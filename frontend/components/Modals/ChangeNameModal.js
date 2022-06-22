import { useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { AiFillEdit, AiFillCloseCircle, AiOutlineUpload } from "react-icons/ai"; TiTick
import { TiTick, TiMail } from "react-icons/ti";
import { BiHash } from "react-icons/bi";



import { useUserPreferencesStore } from "../../store";
import { centerChilds, Text } from "../../styles/Text"
import { changeNameOfUser, getUserWithAuth0ID } from "../../Utils/database";
import {
    ChangeNameInput,
    ChangeNameInputContainer,
    GenericModal,
    LoadingModalContainer,
    ProfileImage
} from "./Modals.styles"






function ChangeName({ userName, userID }) {

    const changeModalEdition = useUserPreferencesStore((state) => state.changeModalEdition);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [name, setName] = useState(userName);
    const [nameInput, setNameInput] = useState("");

    async function updateNameEffects() {
        setIsEditing(false);
        setIsUploading(true);
        let { updatedProfile, updateError } = await changeNameOfUser(userID, nameInput);
        setIsUploading(false);
        if (updatedProfile)
            setName(nameInput);
        changeModalEdition(true);
    }
    return (
        <>
            <Text size={3} style={centerChilds} onClick={() => setIsEditing(!isEditing)}>
                <BiHash />
                {isUploading ? <AiOutlineUpload /> : name}
                {isEditing ? <AiFillCloseCircle /> : <AiFillEdit />}
            </Text>
            {
                isEditing &&
                <ChangeNameInputContainer>
                    <ChangeNameInput type="text" placeholder="name" spellCheck="false"
                        onChange={(event) => { setNameInput(event.target.value) }}
                    />
                    <Text size={2} onClick={async () => {
                        const validName = nameInput && nameInput.length > 2;
                        if (validName) {
                            await updateNameEffects();
                        }
                    }}>
                        <TiTick />
                    </Text>
                </ChangeNameInputContainer>
            }
        </>
    )



}




export default function ChangeNameModal() {
    const userID = useUserPreferencesStore((state) => state.userID);
    const [user, setUser] = useState(null);

    async function fetchUser() {
        let fetchedUser = await getUserWithAuth0ID(userID);
        setUser(fetchedUser.data[0]);
    }
    useEffect(() => {
        fetchUser();
        return () => {
        };
    }, [])

    if (user) {
        return (
            <GenericModal>
                <ProfileImage src={user.authUser.picture} alt={user.authUser.nickname} />
                <ChangeName userName={user.name} userID={userID} />
                <Text size={2} style={centerChilds}>
                    <TiMail />
                    {user.authUser.email}
                </Text>
                <Text style={centerChilds}>
                    <BiHash /> {`you own ${user.ownedProperties.length} properties.`}
                </Text>
                <Text style={centerChilds}>
                    <BiHash /> {`you rent ${user.rentedProperties.length} properties.`}
                </Text>
            </GenericModal>

        )
    }

    return <LoadingModalContainer>
        <Text size={2} style={centerChilds}>
            {"Loading "}
            <RiLoaderFill />
        </Text>
    </LoadingModalContainer>




}