let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
    MapMarkerModal: "MapMarkerModal",
    OwnedPropertyDeleteModal: "OwnedPropertyDeleteModal",
    EditPropertyModal: "EditPropertyModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }