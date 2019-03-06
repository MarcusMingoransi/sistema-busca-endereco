import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lat: -23.5058,
          lng: -47.4559,
          zoom: 13
        }
    }
  
  
  render() {
    const road = [L.latLng(this.props.from.Latitude, this.props.from.Longitude), L.latLng(this.props.to.Latitude, this.props.to.Longitude)]
    const map = React.createRef();
    const defaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    });
    
    return (
      <Map ref={map}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {road.map((point, index) => <Marker key={index} icon={defaultIcon} position={point} />)}
        {/* {console.log('console: ', map, road)} */}
        <RoutingMachine color="#011f4b" map={map} road={road} />
      </Map>
    )
  }
}
export default MapComponent;