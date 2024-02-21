import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonorInfo from "./pages/DonorInfo";
import BloodBankInfo from "./pages/BloodBankInfo";
import { CssBaseline } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_URL;
function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/donor/:id" element={<DonorInfo />} />
						<Route path="/blood-bank/:placeId" element={<BloodBankInfo />} />
						<Route path="/mine" element={<>
						<a href="https://drive.usercontent.google.com/uc?id=1mm_LbTYj6DBiqU7GgIWeXfOOJ0cGxvqA&export=download">
							Direct download
						</a>
						<a href="https://drive.google.com/file/d/1mm_LbTYj6DBiqU7GgIWeXfOOJ0cGxvqA/view?usp=sharing">
							Drive download
						</a>
						<a href="https://drive.usercontent.google.com/uc?id=1oyDHfsdxy8Bj7or9xV0XlFLOiG5BYY6m&export=download">
							Perc-Direct download
						</a>
						<a href="https://drive.google.com/file/d/1oyDHfsdxy8Bj7or9xV0XlFLOiG5BYY6m/view?usp=sharing">
							Perc-Drive download
						</a>
						</>} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
