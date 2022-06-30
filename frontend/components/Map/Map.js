import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { useState, useMemo, useRef } from 'react'
import { useMapStore } from '../../store';

const CustomMarker = ({ draggable, position, address }) => {

  const markerPosition = useMapStore((state) => state.markerPosition);
  const setMarkerPosition = useMapStore((state) => state.setMarkerPosition);




  const draggableMarkerReference = useRef(null)
  const dragEvents = useMemo(() => ({
    dragend() {
      const marker = draggableMarkerReference.current
      if (marker) setMarkerPosition(marker.getLatLng())
    }
  }), []);

  if (draggable) {
    return (
      <Marker draggable={true} position={markerPosition} ref={draggableMarkerReference} eventHandlers={dragEvents}>
        <Popup>{address}</Popup>
      </Marker>
    )

  }
  return (
    <Marker position={position}>   <Popup>{address}</Popup>  </Marker>
  )
}

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}


const Map = ({ draggable, position, address }) => {

  const markerPosition = useMapStore((state) => state.markerPosition);
  let positionOfDhaka = { lat: 23.7104000, lng: 90.4074400 };

  return (
    <MapContainer className={styles.map} center={markerPosition} zoom={11} scrollWheelZoom={true}>
      <ChangeView center={markerPosition} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker draggable={draggable} position={position ? position : positionOfDhaka} address={address} />

    </MapContainer>
  )
}

export default Map;