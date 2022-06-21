import { useModalStore } from "../../store";
import { ModalContainer } from "./Modal.styles";


export default function Modal(props) {

    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);

    if (!isModalOpen) return <></>

    return (
        <ModalContainer onClick={toggleIsModalOpen}>
            {props.children}
        </ModalContainer>
    )
}