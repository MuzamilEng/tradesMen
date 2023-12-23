import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Icon } from '@iconify/react';

const ACCESS_TOKEN = 'pk.eyJ1Ijoic3BlY25nIiwiYSI6ImNrZXg3N3dlOTA2cjgydGxieG80czFjODUifQ.WR9WrMxOGB6EdiXonbuzQQ';

const Map = ({setSearchedLocation}) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [marker, setMarker] = useState(null);

  const getSearchSuggestions = async (searchText) => {
    const GEOCODING_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${ACCESS_TOKEN}`;

    try {
      const response = await fetch(GEOCODING_API_URL);
      if (response.ok) {
        const data = await response.json();
        // console.log(data, 'data');
        return data.features;
      } else {
        console.error('Geocoding request failed.');
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  let map;

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;

    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.99209, 40.68933],
      zoom: 12.8,
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.on('load', () => {
      // Add GeolocateControl only after the map has loaded
      map.addControl(new mapboxgl.GeolocateControl());
    });

    const fetchSuggestions = async () => {
      if (searchText) {
        const suggestions = await getSearchSuggestions(searchText);
        if (suggestions[0]) {
          const lngLat = suggestions[0].center;
          if (map) {
            map.flyTo({ center: lngLat });
            addMarker(lngLat);
          }
        }
        setSuggestions(suggestions);
      }
    };

    fetchSuggestions();

    return () => {
      map.remove();
    };
  }, [searchText]);

  const addMarker = (lngLat) => {
    if (lngLat && !isNaN(lngLat[0]) && !isNaN(lngLat[1])) {
      if (marker) {
        marker.remove();
      }

      const customIcon = document.createElement('img');
    customIcon.src = '/images/marker1.png';
    customIcon.style.width = '3vw';
    customIcon.style.height = '3vw';
    customIcon.style.marginTop = '-1.2vw';

      const newMarker = new mapboxgl.Marker({ element: customIcon }).setLngLat(lngLat).addTo(map);
      setMarker(newMarker);
    }
  };

  const handleSearchLocation = (e) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
      setSelectedSuggestion(suggestion.place_name);
    setSearchText(suggestion.place_name);
    setSearchedLocation(suggestion);
    const lngLat = suggestion.center;
  
    if (map) {
      if (!selectedSuggestion) {
        map.flyTo({ center: lngLat });
      }
  
      // Remove all other suggestions
      setSuggestions([]);
      addMarker(lngLat); // Add marker to the selected location
    }
  };
  
  

  return (
    <div className='relative'>
    <div className="flex items-center w-full justify-between w-full max-w-[23vw] border-[1px] rounded-lg border-gray-300">
            <input
            type="text"
            placeholder="Enter your location"
            value={searchText}
            className="w-full text-vw text-black max-w-[20vw] p-[0.7vw] bouder-none focus:outline-none"
            onChange={handleSearchLocation}
          />
          <Icon className='text-[1.3vw] cursor-pointer mr-[0.5vw]' icon="bi:search" color="black" onClick={handleSearchLocation} />
    </div>
      <ul>
        {selectedSuggestion ? (
          <li onClick={() => handleSuggestionClick(selectedSuggestion)}>
            {selectedSuggestion.place_name}
          </li>
        ) : (
          suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))
        )}
      </ul>
      <div id="map" style={{ position: 'absolute', width: '100%', height: '600px' }} />
    </div>
  );
};

export default Map;