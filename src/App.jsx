import LandingPage from "./pages/LandingPage";
import { CssBaseline } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
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
