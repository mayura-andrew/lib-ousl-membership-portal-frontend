// src/components/PaymentLocationMap.tsx
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const LIBRARY_LOCATION = {
  lat: 6.883469, // Replace with actual OUSL library coordinates
  lng: 79.8863655,
};

const PaymentLocationMap = () => {
  const [isOpen, setIsOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-orange-100">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '300px' }}
          center={LIBRARY_LOCATION}
          zoom={16}
        >
          <Marker
            position={LIBRARY_LOCATION}
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <InfoWindow
              position={LIBRARY_LOCATION}
              onCloseClick={() => setIsOpen(false)}
            >
              <div className="p-2">
                <h3 className="font-medium text-gray-900">Library Payment Counter</h3>
                <p className="text-sm text-gray-600">Open Hours: 9:00 AM - 4:00 PM</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PaymentLocationMap;
