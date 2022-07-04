import { useRouter } from "next/router";
import { FaTrash, FaUpload } from "react-icons/fa";
import { centerChilds, Text } from "../../styles/Text";
import { deleteOwnedPropertyByID } from "../../Utils/database";
import { DeletePropertyButton, GenericModal } from "./Modals.styles";
import { useModalStore } from "../../store"
import { useState } from "react";

export default function DeleteOwnedPropertyModal({ property }) {
    let router = useRouter();


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteProperty() {
        setIsDeleting(true);
        const { data, error } = await deleteOwnedPropertyByID(property.propertyID);
        setIsDeleting(false);
        toggleIsModalOpen();
        if (data) window.location.reload(false);


    }
    return (
        <GenericModal style={{ height: "max-content" }}>
            <Text style={centerChilds}>
                {`Click the button to remove the property @address "`}
                {`${property.address}`}
                {`" from the list of your owned properties!`}
            </Text>
            <DeletePropertyButton onClick={async () => { await deleteProperty() }}>
                <Text size={3} style={centerChilds}>
                    {isDeleting ? <FaUpload /> : <FaTrash />}
                </Text>
            </DeletePropertyButton>
        </GenericModal>
    )
}