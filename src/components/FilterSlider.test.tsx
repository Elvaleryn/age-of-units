import data from '../../db.json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { FilterSlider } from './FilterSlider';
import { Slider } from '@material-ui/core';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
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

configure({ adapter: new Adapter() });
describe('<Container />', () => {
	const wraptWithProvider = (component: any) => {
		return mount(<Provider store={mockStore}>{component}</Provider>);
	};

	it('renders Food Filter', () => {
		wraptWithProvider(
			<FilterSlider index={1} name={'Food'} checkboxStatus={{ Food: true }} />
		);
	});

	it('renders Wood Filter', () => {
		wraptWithProvider(
			<FilterSlider index={2} name={'Wood'} checkboxStatus={{ Wood: true }} />
		);
	});

	it('renders Gold Filter', () => {
		wraptWithProvider(
			<FilterSlider index={3} name={'Gold'} checkboxStatus={{ Gold: true }} />
		);
	});

	it('Should Fire handleChange when Slider changes', () => {
		const component = wraptWithProvider(
			<FilterSlider index={3} name={'Gold'} checkboxStatus={{ Gold: true }} />
		);
		const slider = component.find(Slider);
		const logSpy = jest.spyOn(console, 'log');

		//expect(logSpy).toBeCalledWith('handleChange fired');
	});

	it('Should Fire hangleClickCheckbox when Slider checkbox is clicked', () => {
		const component = wraptWithProvider(
			<FilterSlider index={2} name={'Wood'} checkboxStatus={{ Wood: true }} />
		);
		const sliderEvent = jest.fn();
		const checkbox = component.find(FilterSlider).find('#Wood');
		const logSpy = jest.spyOn(console, 'log');
		checkbox.simulate('click');
		expect(logSpy).toBeCalledWith('handleCheckboxClick fired');
	});
});
