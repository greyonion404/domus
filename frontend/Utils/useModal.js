

let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }