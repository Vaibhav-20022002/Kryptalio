import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import Footer from "./components/Footer";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/exchanges" element={<Exchanges />} />
				<Route path="/coins" element={<Coins />} />
				<Route path="/coin/:id" element={<CoinDetails />} />
			</Routes>
			<Footer/>
		</Router>
	);
};

export default App;
