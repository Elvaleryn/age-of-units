import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './Home';

describe('<Container />', () => {
	it('renders', () => {
		render(<Home />);
	});
});
