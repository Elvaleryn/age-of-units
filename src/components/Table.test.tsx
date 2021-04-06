import React from 'react';
import { render } from '@testing-library/react';
import { Table } from './Table';
import data from '../../db.json';
import { IUnit } from '../model/unit.model';
describe('<Container />', () => {
	it('renders', () => {
		render(<Table units={data.units as Array<IUnit>} />);
	});
});
