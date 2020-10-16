import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import mapTiles from "../utils/mapTiles";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import mapMarker from "../assets/logoFace.svg";
import "../styles/pages/orphanages-map.css";
import api from "../services/api";
import { removeEmitHelper } from "typescript";

interface Orphanage {
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages")
      .then((response) => {
        setOrphanages(response.data);
      })
      .catch();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Caieiras</strong>
          <p>São Paulo</p>
        </footer>
      </aside>

      <Map
        center={[-23.3619164, -46.7528392]}
        zoom={14.35}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapTiles.light}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker 
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]} 
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                minHeight={45}
                maxHeight={45}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
