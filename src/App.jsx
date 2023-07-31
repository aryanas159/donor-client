import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_URL;
function App() {
	return (
		<CssBaseline>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />}/>
					<Route path="/register" element={<Register />}/>
					<Route path="/login" element={<Login />}/>
				</Routes>
			</BrowserRouter>
		</CssBaseline>
	);
}

export default App;
