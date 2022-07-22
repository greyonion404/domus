let ModalTypes =
{
    ChaneNameModal: "ChangeNameModal",
    MoveMapMarkerModal: "MoveMapMarkerModal",
    MapMarkerModal: "MapMarkerModal",
    OwnedPropertyDeleteModal: "OwnedPropertyDeleteModal",
    RentedPropertyDeleteModal: "RentedPropertyDeleteModal",
    EditPropertyModal: "EditPropertyModal",
    AddIssueModal: "AddIssueModal",
    IssueHistoryModal: "IssueHistoryModal",
}
function showModal(currentType, modalType, isModalOpen) {
    return ((currentType == modalType) && isModalOpen);
}

export { ModalTypes, showModal }