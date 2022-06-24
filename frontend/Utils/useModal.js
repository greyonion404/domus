import { useState } from "react";
import { useModalStore } from "../store";

function useModal() {

    let ModalTypes =
    {
        ChaneNameModal: "ChangeNameModal",
    }


    const modalType = useModalStore((state) => state.modalType);
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const toggleIsModalOpen = useModalStore((state) => state.toggleIsModalOpen);
    const setModalType = useModalStore((state) => state.setModalType);



    function openModal(type) {
        if (!isModalOpen) {
            setModalType(type);
            toggleIsModalOpen();
        }
    }
    function closeModal() {
        if (isModalOpen) {
            setModalType("");
            toggleIsModalOpen();
        }
    }
    function showModal(type) {
        return ((type == modalType) && isModalOpen);
    }

    return { showModal, openModal, closeModal, ModalTypes };
}

export { useModal }