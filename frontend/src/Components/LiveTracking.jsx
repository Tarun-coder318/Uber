import React from 'react'
import {LoadScript ,GoogleMap, Marker} from '@react-google-maps/api'
import { useEffect, useState } from 'react'

const containerStyle = {
    width: '100%',
    height: '100%'
    };

    const center = {
    lat: 10.99835602,
    lng: -74.0138216
    };

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                console.log('Position updated:', latitude, longitude);
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds
        
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <GoogleMap
              
               mapContainerStyle={containerStyle}
               center={currentPosition}
               zoom={15}
               options={{
                 zoomControl: true,
                 scrollwheel: true,
                 gestureHandling: "greedy",
                 disableDefaultUI: false,
                 clickableIcons: true,
                 draggable: true,
               }}
             >
             
            
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
  )
}

export default LiveTracking
