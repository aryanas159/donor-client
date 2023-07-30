import Map, { Marker } from "react-map-gl";
import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import Place from "./Place";
const AppMap = ({ mapRef, setNewPlace, newPlace, viewport, setViewport }) => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);

	const getResults = async (query) => {
		const formattedQuery = query.split(" ").join("%20");
		const res = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedQuery}.json?proximity=ip&access_token=${
				import.meta.env.VITE_MAPBOX_API_KEY
			}`
		);
		setResults(res?.data?.features);
		console.log(res);
	};
	const handleAddClick = (e) => {
		setNewPlace({
			lat: e?.lngLat?.lat,
			lng: e?.lngLat?.lng,
		});
	};
	const setPosition = (position) => {
		const { coords } = position;
		setViewport({
			longitude: coords.longitude,
			latitude: coords.latitude,
			zoom: 14,
		});
	};
	const error = (e) => {
		console.log(e);
	};
	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setPosition, error);
		}
	};
	
	useEffect(getCurrentLocation, []);
	return (
		<>
			<TextField
				size="small"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{!!results.length && (
				<Box zIndex={100000}>
					{results.map((result) => (
						<Place key={result.id} placeName={result.place_name} handlePlaceSelect={() => {
							
							setViewport({
								latitude: result.geometry.coordinates[1],
								longitude: result.geometry.coordinates[0],
								zoom: 14
							})
							setNewPlace({
								lat: result.geometry.coordinates[1],
								lng: result.geometry.coordinates[0],
							});
							setSearch("")
							setResults([])
						}}/>
					))}
				</Box>
			)}
			<Button onClick={() => getResults(search)}>search</Button>
			<Map
				ref={mapRef}
				mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
				{...viewport}
				onMove={(evt) => setViewport(evt.viewState)}
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
						onDragEnd={(e) => {
							setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat });
							console.log(newPlace);
						}}
					/>
				) : null}
			</Map>
		</>
	);
};

export default AppMap;

