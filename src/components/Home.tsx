/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import img1 from '../assets/img/age1.jpg';

export const Home = () => {
	return (
		<div className="container-fluid home">
			<div className="mt-4 d-flex flex-column align-items-center">
				<h1 className="title text-center">Home Page</h1>
				<img src={img1} alt="home image" />
			</div>
		</div>
	);
};
