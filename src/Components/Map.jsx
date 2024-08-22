import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import marker from '../Resources/hospital.png';
import popmarker from '../Resources/map-marker.png';

const LeafletMap = (props) => {
  const [hospitals, setHospitals] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${props.currentLocation.lat},${props.currentLocation.lng})["amenity"=${"hospital"||"clinic"}];out;`);
        console.log(response.data.elements)
        const hospitalsData = response.data.elements.map((element) => {
          const address = Object.keys(element.tags)
            .filter((key) => key.startsWith("addr:"))
            .reduce((acc, key) => {
              const propName = key.substring(5);
              acc[propName] = element.tags[key];
              return acc;
            }, {});
        
          return {
            id: element.id,
            name: element.tags.name || 'Unnamed Hospital',
            lat: element.lat,
            lon: element.lon,
            address: address
          };
        });

        setHospitals(hospitalsData);
        mapRef.current.flyTo([props.currentLocation.lat, props.currentLocation.lng], 17, { duration: 4 });
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const MarkerIcon = new Icon({
    iconUrl: marker,
    iconSize: [50, 50]
  });

  return (
    <div className='w-full h-4/5 my-10 mx-8' style={{ ":hover": { transform: 'translateZ(60px)' } }}>
      <MapContainer ref={mapRef} center={[props.currentLocation.lat, props.currentLocation.lng]} zoom="3" className='w-full h-full rounded-3xl shadow-violet-400 shadow-xl'>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hospitals.map((hospital) => (
          <Marker key={hospital.id} position={[parseFloat(hospital.lat), parseFloat(hospital.lon)]} icon={MarkerIcon}>
            <Popup><img src={popmarker} className='w-14 h-14' onClick={() => props.setSelectedHospital(hospital)} /><p>{hospital.name}</p></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
