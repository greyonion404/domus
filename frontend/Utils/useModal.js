let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
    MapMarkerModal: "MapMarkerModal",
    OwnedPropertyDeleteModal: "OwnedPropertyDeleteModal",
    RentedPropertyDeleteModal: "RentedPropertyDeleteModal",
    EditPropertyModal: "EditPropertyModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }