import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { GenericModal } from '../Modals/Modals.styles'

export default function Map() {
    return (
        <GenericModal>
            <MapContainer style={{ height: "100%", width: "100%", zIndex: '1' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </GenericModal>
    )

}