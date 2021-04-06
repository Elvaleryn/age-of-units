import { UnitPage } from './UnitsPage';
import data from '../../db.json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Middleware, Dispatch, AnyAction } from 'redux';

const initialState: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
const createMockStore = configureMockStore(initialState); // because component is fetching data from state using selector we need mockstore
configure({ adapter: new Adapter() });
const mockStore = createMockStore({
	unit: {
		units: data.units,
		filteredUnits: data.units,
		enableCheckBoxes: { Food: true, Wood: false, Gold: false },
	},
});

describe('<Container />', () => {
	const renderComponent = () => {
		return mount(
			<Provider store={mockStore}>
				<BrowserRouter>
					<UnitPage />
				</BrowserRouter>
			</Provider>
		);
	};

	it('renders', () => {
		renderComponent();
	});

	it('Should Get All Age Records', () => {
		const component = renderComponent();
		const buttonClick = jest.fn();
		const allButton = component
			.find(UnitPage)
			.find('#myBtnContainer')
			.find('button')
			.at(0);

		allButton.simulate('click');
		expect(buttonClick).toBeTruthy();
	});

	it('Should Get Units By Castle Filter', () => {
		const component = renderComponent();
		const buttonClick = jest.fn();
		const allButton = component
			.find(UnitPage)
			.find('#myBtnContainer')
			.find('button')
			.at(1);

		allButton.simulate('click');
		expect(buttonClick).toBeTruthy();
	});
});
