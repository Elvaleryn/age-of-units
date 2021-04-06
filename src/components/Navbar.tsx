/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
				<NavLink className="navbar-brand" to="/">
					Age of Empires
				</NavLink>

				<div className="">
					<div className="navbar-nav">
						<NavLink
							exact
							className="nav-item nav-link"
							to="/"
							activeClassName={'active'}
						>
							Home
						</NavLink>
						<NavLink
							exact
							className="nav-item nav-link"
							to="/units"
							activeClassName={'active'}
						>
							Units
						</NavLink>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
