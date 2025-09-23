import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  region?: string;
}

interface LocationError {
  code: number;
  message: string;
}

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: LocationError | null;
  requestLocation: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LocationError | null>(null);

  const getLocationDetails = async (lat: number, lon: number): Promise<LocationData> => {
    try {
      // Using a free geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location details');
      }
      
      const data = await response.json();
      
      return {
        latitude: lat,
        longitude: lon,
        city: data.city || data.locality,
        state: data.principalSubdivision,
        country: data.countryName,
        region: data.principalSubdivision || data.countryName
      };
    } catch (err) {
      // Fallback to basic coordinates if geocoding fails
      return {
        latitude: lat,
        longitude: lon,
        region: 'Unknown Region'
      };
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser.'
      });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationData = await getLocationDetails(latitude, longitude);
          setLocation(locationData);
        } catch (err) {
          setError({
            code: 0,
            message: 'Failed to get location details'
          });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError({
          code: err.code,
          message: err.message
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return {
    location,
    loading,
    error,
    requestLocation
  };
};