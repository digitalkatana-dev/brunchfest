import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Navbar />
		</Router>
	);
}

export default App;
