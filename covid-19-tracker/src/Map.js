import React from 'react'
import { Map as LeafletMap, TileLayer} from "react-leaflet"
import "./Map.css"
import {showDataOnMap} from'./utl';


function Map({countries, casesType, center, zoom}) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                  url ="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
                />
                {showDataOnMap(countries, casesType)}

            </LeafletMap>
            <h2>WORLD MAP</h2>
            
        </div>
    )
}

export default Map;
