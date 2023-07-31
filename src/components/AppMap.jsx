import Map, { Marker } from "react-map-gl";
import { useEffect, useState } from "react";
import { TextField, Button, Box, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import Place from "./Place";
import BloodDrop from "../assets/blood-drop.png"
const AppMap = ({
	mapRef,
	setNewPlace,
	newPlace,
	viewport,
	setViewport,
	donors,
}) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [textFieldElement, setTextFieldElement] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const getResults = async (query) => {
		setAnchorEl(textFieldElement);
		const formattedQuery = query.split(" ").join("%20");
		const res = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedQuery}.json?proximity=ip&access_token=${
				import.meta.env.VITE_MAPBOX_API_KEY
			}`
		);
		setSearchResults(res?.data?.features);
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
		setNewPlace({
			lat: coords.latitude,
			lng: coords.longitude,
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
		<Box display="flex" flexDirection="column" gap={2} flex={3}>
			<Box display={"flex"} gap={2}>
				<TextField
					size="small"
					value={search}
					onChange={(e) => {
						setTextFieldElement(e.currentTarget);
						setSearch(e.target.value);
					}}
				/>
				<Button variant="contained" onClick={() => getResults(search)}>
					search
				</Button>
			</Box>
			{!!searchResults.length && (
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					style={{ padding: "24px" }}
				>
					{searchResults.map((result) => (
						<Place
							key={result.id}
							placeName={result.place_name}
							handlePlaceSelect={() => {
								setViewport({
									latitude: result.geometry.coordinates[1],
									longitude: result.geometry.coordinates[0],
									zoom: 14,
								});
								setNewPlace({
									lat: result.geometry.coordinates[1],
									lng: result.geometry.coordinates[0],
								});
								setSearch("");
								setSearchResults([]);
							}}
						/>
					))}
				</Menu>
			)}
			<Map
				ref={mapRef}
				mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
				{...viewport}
				onMove={(evt) => setViewport(evt.viewState)}
				mapStyle="mapbox://styles/aryanas159/clkp390m9003n01o24pja3bhv"
				onDblClick={handleAddClick}
				transitionDuration="200"
				attributionControl={true}
				style={{ borderRadius: "12px" }}
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
				{!!donors?.length &&
					donors.map((donor) => (
						<Marker latitude={donor?.location?.latitude} longitude={donor?.location?.longitude}>
							<img src={BloodDrop} height={60}/>
						</Marker>
					))}
			</Map>
		</Box>
	);
};

export default AppMap;
