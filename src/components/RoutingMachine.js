import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { withLeaflet } from 'react-leaflet';
import 'leaflet-routing-machine/src';


class RoutingMachine extends MapLayer {
  componentDidMount() {
    this.interval = setInterval(() => {
      // console.log(this.leafletElement);
      // this.leafletElement.getPlan().setWaypoints([]);
      // const { color, map, road } = this.props;
      // this.createLeafletElement();
      
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateLeafletElement(fromProps, toProps){
    console.log('Oi! =) - ' , fromProps, toProps);
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
    // this.leafletElement.getPlan().setWaypoints([fromProps.position, toProps.position]);
  }
    createLeafletElement() {
      const { color, map, road } = this.props;
  
      var leafletElement = L.Routing.control({
        waypoints: road,
        lineOptions: {
          styles: [{ 
            color, 
            opacity: .8,
            weight: 6 
          }]
        },
        autoRoute: true,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        altLineOptions: { styles: [{opacity: 0}] },
        createMarker: () => { return null; }
      })
      .addTo(map.current.leafletElement);
      // leafletElement.on('waypointschanged', () => {
      //   console.log(leafletElement._routes[0].summary.totalDistance);
      // });

      leafletElement.on('routesfound', function(e) {
        let routes = e.routes;
        console.log(routes);
      });
      // leafletElement.hide(); // hide road describtion
  
      return leafletElement.getPlan();
    }
  }
  
  export default withLeaflet(RoutingMachine);