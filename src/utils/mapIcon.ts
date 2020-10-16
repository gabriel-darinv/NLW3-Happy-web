import Leaflet from "leaflet"

import mapMarker from '../assets/logoFace.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [42, 50],
  iconAnchor: [21, 47],
  popupAnchor: [160, 15]
})

export default mapIcon;