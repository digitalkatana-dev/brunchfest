import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Main from './features/Main';
import './App.scss';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Navbar />
			<Menu />
			<Routes>
				<Route path='/' element={<Main />} />
			</Routes>
		</Router>
	);
}

export default App;
