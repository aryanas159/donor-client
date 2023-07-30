// import { useState, useEffect, useRef } from "react";
// import ReactMapGL, { Marker } from "react-map-gl";
// // import LocationOnIcon from "@mui/icons-material/LocationOn";
// const MapComponent = () => {
// 	const [viewState, setViewState] = useState({
// 		longitude: -100,
// 		latitude: 40,
// 		zoom: 3.5,
// 	});
// 	const [newPlace, setNewPlace] = useState({
// 		latitude: 26.80224,
// 		longitude: 75.824928,
// 	});
// 	const mapRef = useRef()
// 	const setPosition = (position) => {
// 		const { coords } = position;
// 		setViewState({
// 			longitude: coords.longitude,
// 			latitude: coords.latitude,
// 			zoom: 14,
// 		});
// 	};
// 	const error = (e) => {
// 		console.log(e);
// 	};
// 	const getCurrentLocation = () => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(setPosition, error);
// 		}
// 	};
// 	const handleDbClick = (e) => {
// 		setNewPlace({
// 			latitude: e?.lngLat?.lat,
// 			longitude: e?.lngLat?.lng,
// 		});
// 	};

// 	useEffect(getCurrentLocation, []);
// 	return (
// 		<ReactMapGL
// 			mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
// 			// ref={mapRef}
// 			initialViewState={viewState}
// 			style={{ height: "80vh" }}
// 			onViewportChange={(viewPort) => {
// 				console.log(viewPort)
// 				setViewState(viewPort)
// 			}}
// 			mapStyle="mapbox://styles/aryanas159/clkp390m9003n01o24pja3bhv"
// 			onDblClick={handleDbClick}
// 		>
// 			<Marker
// 				latitude={newPlace.latitude}
// 				longitude={newPlace.longitude}
// 				draggable
// 				onDragEnd={(e) =>
// 					setNewPlace({ longitude: e.lngLat.lng, latitude: e.lngLat.lat })
// 				}
// 			/>
// 		</ReactMapGL>
// 	);
// };

// export default MapComponent;

import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ReactMapGL, { Marker } from "react-map-gl";

// -26.475393195281754, 153.04416685709924

const MapComponent = () => {
	let initial = {
		latitude: 28.6448,
		longitude: 77.216721,
		zoom: 9,
		pitch: 0,
		antialias: true,
	};

	const mapRef = useRef();
	const [newPlace, setNewPlace] = useState(null);
	const [viewport, setViewport] = useState(initial);

	const handleAddClick = (e) => {
		setNewPlace({
			lat: e?.lngLat?.lat,
			lng: e?.lngLat?.lng,
		});
	};

	return (
			<ReactMapGL
			ref={mapRef}
			mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
			initialViewState={viewport}
			onViewportChange={(viewport) => setViewport(viewport)}
			mapStyle="mapbox://styles/aryanas159/clkp390m9003n01o24pja3bhv"
			onDblClick={handleAddClick}
			transitionDuration="200"
			attributionControl={true}
			
		>
			{newPlace ? (
				<Marker
					latitude={newPlace?.lat}
					longitude={newPlace?.lng}
					draggable
					onDragEnd={(e) =>
						setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat })
					}
				/>
			) : null}
		</ReactMapGL>
	);
};

export default MapComponent;
