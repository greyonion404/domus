import { useModalStore } from "../../store";
import { ModalContainer, CloseModalButton } from "./Modal.styles";
import { AiFillCloseCircle } from 'react-icons/ai'
import { centerChilds, Text } from "../../styles/Text";



export default function Modal(props) {

    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);

    if (!isModalOpen) return <></>

    return (
        <ModalContainer>
            <CloseModalButton onClick={toggleIsModalOpen}>
                <Text size={2} style={centerChilds}>
                    <AiFillCloseCircle/>
                </Text>
            </CloseModalButton>
            {props.children}
        </ModalContainer>
    )
}