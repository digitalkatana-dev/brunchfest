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
import CreateEvent from './features/CreateEvent';
import Settings from './features/Settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.scss';

function App() {
	const { user } = useSelector((state) => state.auth);

	return (
		<Router>
			<Navbar />
			<Menu />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/create' element={user ? <CreateEvent /> : <Main />} />
				<Route path='/settings' element={user ? <Settings /> : <Main />} />
			</Routes>
		</Router>
	);
}

export default App;
