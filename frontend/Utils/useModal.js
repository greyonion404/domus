let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }