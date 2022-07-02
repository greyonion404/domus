let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
    MapMarkerModal: "MapMarkerModal"
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }