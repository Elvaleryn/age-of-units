import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core/';
import { actions } from '../redux/unit';
import { useDispatch } from 'react-redux';

interface IFilterSliderProps {
	name: string;
	checkboxStatus: any;
	index: number;
}

export const FilterSlider = ({
	name,
	index,
	checkboxStatus,
}: IFilterSliderProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [value, setValue] = React.useState<number | number[]>([0, 50]);

	const handleChange = (event: any, value: number | number[]) => {
		console.log(event);
		console.log('handleChange fired');
		dispatch(actions.filterByCost({ value, name }));
		setValue(value);
	};

	function valuetext(value: number) {
		return `${value}`;
	}

	const handleCheckboxClick = (e: any): void => {
		console.log('handleCheckboxClick fired');
		let checkboxStates = checkboxStatus as any;
		checkboxStates[e.target.name] = e.target.checked;
		dispatch(actions.filterByCostCheckbox({ checkboxStates }));
		dispatch(actions.filterByCost({ value, name }));
	};

	return (
		<div className={classes.root} key={index}>
			<div className="d-flex align-items-center mb-5">
				<div className="wood-wrap">
					<input
						type="checkbox"
						onClick={(e: any) => handleCheckboxClick(e)}
						name={name}
						id={name}
					/>
					<label htmlFor={name}>{name}</label>
				</div>

				<Slider
					disabled={!checkboxStatus[name]}
					track="inverted"
					min={0}
					max={200}
					aria-labelledby="track-inverted-range-slider"
					getAriaValueText={valuetext}
					value={value}
					marks={marks}
					onChange={handleChange}
					valueLabelDisplay="auto"
				/>
				<p className={classes.valuedisplay}> {value.toString()} </p>
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
			[theme.breakpoints.up('lg')]: {
				width: '40%',
			},
		},
		valuedisplay: {
			width: '100px',
			borderBottom: '1px solid black',
			marginBottom: '35px',
			marginLeft: '80px',
		},
		margin: {
			height: theme.spacing(3),
		},
	})
);

const marks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 50,
		label: '50',
	},
	{
		value: 100,
		label: '100',
	},
	{
		value: 150,
		label: '150',
	},
	{
		value: 200,
		label: '200',
	},
];
