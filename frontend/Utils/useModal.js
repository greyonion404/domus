let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
    MapMarkerModal: "MapMarkerModal",
    OwnedPropertyDeleteModal: "OwnedPropertyDeleteModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }