import LandingPage from "./pages/LandingPage";
import { CssBaseline } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_AXIOS_URL
function App() {
	return (
		<>
			<CssBaseline>
				<LandingPage />
			</CssBaseline>
		</>
	);
}

export default App;
