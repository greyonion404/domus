import { FaTrash } from "react-icons/fa";
import { centerChilds, Text } from "../../styles/Text";
import { DeletePropertyButton, GenericModal } from "./Modals.styles";

export default function DeleteOwnedPropertyModal({ property }) {
    return (
        <GenericModal style={{ height: "max-content" }}>
                <Text style={centerChilds}>
                    {`Click the button to remove the property @address "`}
                    <span style={{textDecoration: "underline"}}>
                        {`${property.address}`}
                    </span>
                    {`" from the list of your owned properties!`}
                </Text>
            <DeletePropertyButton>
                <Text size={3} style={centerChilds}>
                    <FaTrash />
                </Text>
            </DeletePropertyButton>
        </GenericModal>
    )
}