import { useRouter } from "next/router";
import { FaTrash, FaUpload } from "react-icons/fa";
import { centerChilds, Text } from "../../styles/Text";
import { deleteIssueOfProperty, deleteOwnedPropertyByID, updatePropertyRenterID } from "../../Utils/database";
import { DeletePropertyButton, GenericModal } from "./Modals.styles";
import { useModalStore } from "../../store"
import { useState } from "react";

export default function DeleteRentedPropertyModal({ property, profile }) {
    let router = useRouter();


    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteProperty() {
        setIsDeleting(true);
        const { updatedProperty, updateError } = await updatePropertyRenterID(property.propertyID, profile = { authID: "" });
        await deleteIssueOfProperty(property.propertyID);
        console.log(updateError);
        setIsDeleting(false);
        toggleIsModalOpen();
        if (updatedProperty) window.location.reload(false);


    }
    return (
        <GenericModal style={{ height: "max-content" }}>
            <Text style={centerChilds}>
                {`Click the button to remove the property @address "`}
                {`${property.address}`}
                {`" from the list of your rented properties!`}
            </Text>
            <DeletePropertyButton onClick={async () => { await deleteProperty() }}>
                <Text size={3} style={centerChilds}>
                    {isDeleting ? <FaUpload /> : <FaTrash />}
                </Text>
            </DeletePropertyButton>
        </GenericModal>
    )
}