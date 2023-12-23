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
    map.addControl(new mapboxgl.GeolocateControl());
    // map.addControl(new mapboxgl.CompassControl(), 'top-left');

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

      const customIcon = document.createElement('div');
      customIcon.className = 'custom-marker';
      customIcon.style.backgroundImage = 'url(/img/star.png)';
      customIcon.style.width = '30px';
      customIcon.style.height = '30px';

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
      <input
        type="text"
        placeholder="Enter your business address"
        value={searchText}
        className="w-full h-[3rem] text-lg text-black p-2 border-[1.5px] rounded-lg m-2 focus:outline-blue-900"
        onChange={handleSearchLocation}
      />
      <Icon className='absolute top-5 text-2xl right-2' icon="bi:search" color="black" onClick={handleSearchLocation} />
      {/* <button onClick={handleSearch}>Search</button> */}
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
