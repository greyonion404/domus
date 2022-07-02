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
    ProfileImage
} from "./Modals.styles"






function ChangeName({ userName, userID, isUpdating, setIsUpdating }) {

    const changeModalEdition = useUserPreferencesStore((state) => state.changeModalEdition);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(userName);
    const [nameInput, setNameInput] = useState("");

    async function updateNameEffects() {
        const validName = nameInput && nameInput.length > 2;
        if (!validName) return;

        setIsEditing(false);
        setIsUpdating(true);
        let { updatedProfile, updateError } = await changeNameOfUser(userID, nameInput);
        setIsUpdating(false);
        if (updatedProfile)
            setName(nameInput);
        changeModalEdition(true);
    }

    return (
        <>
            <Text size={3} style={centerChilds} onClick={() => setIsEditing(!isEditing)}>
                <BiHash />
                {isUpdating ? <AiOutlineUpload /> : name}
                {isEditing ? <AiFillCloseCircle /> : <AiFillEdit />}
            </Text>
            {
                isEditing &&
                <ChangeNameInputContainer>
                    <ChangeNameInput type="text" placeholder="name" spellCheck="false"
                        onChange={(event) => { setNameInput(event.target.value) }}
                    />
                    <Text size={2} onClick={async () => {
                        await updateNameEffects();
                    }}>
                        <TiTick />
                    </Text>
                </ChangeNameInputContainer>
            }
        </>
    )



}




export default function ChangeNameModal({ profile }) {
    const userID = useUserPreferencesStore((state) => state.userID);
    const user = profile;
    const [isUpdating, setIsUpdating] = useState(false);
  
    return (
        <GenericModal>
            <ProfileImage src={user.authUser.picture} alt={user.authUser.nickname} />
            <ChangeName userName={user.name} userID={userID} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>
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