import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { centerChilds, Text } from "../../styles/Text";
import { deleteOwnedPropertyByID } from "../../Utils/database";
import { DeletePropertyButton, GenericModal } from "./Modals.styles";
import { useModalStore } from "../../store"

export default function DeleteOwnedPropertyModal({ property }) {
    let router = useRouter();

    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);


    async function deleteProperty() {
        const { data, error } = await deleteOwnedPropertyByID(property.propertyID);
        console.log(data);
        console.log(error);
        if (data) {
            toggleIsModalOpen();
            window.location.reload(false);
        }
    }
    return (
        <GenericModal style={{ height: "max-content" }}>
            <Text style={centerChilds}>
                {`Click the button to remove the property @address "`}
                <span style={{ textDecoration: "underline" }}>
                    {`${property.address}`}
                </span>
                {`" from the list of your owned properties!`}
            </Text>
            <DeletePropertyButton onClick={async () => { await deleteProperty() }}>
                <Text size={3} style={centerChilds}>
                    <FaTrash />
                </Text>
            </DeletePropertyButton>
        </GenericModal>
    )
}