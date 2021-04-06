import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../config/rootReducer';
import { actions } from '../redux/unit';
import { IUnit } from '../model/unit.model';
import { Table } from './Table';
import { FilterSlider } from './FilterSlider';

export const UnitPage = () => {
	const dispatch = useDispatch();
	const serviceResponse = useSelector((state: IRootState) => state.unit.units);
	const fiteredUnits = useSelector(
		(state: IRootState) => state.unit.filteredUnits
	);
	const [filterStatus, setFilterStatus] = useState<any>(
		useSelector((state: IRootState) => state.unit.enableCheckBoxes)
	);
	const [units, setUnits] = useState<IUnit | any>([]);

	useEffect(() => {
		dispatch(actions.fetchUnits());
	}, [dispatch]);

	useEffect(() => {
		setFilterStatus(filterStatus);
	}, [filterStatus]);

	useEffect(() => {
		setUnits(fiteredUnits);
	}, [fiteredUnits]);

	const getUniqueAgeTypes = (): Array<string> => {
		const ages = [...new Set(serviceResponse.map((item: IUnit) => item.age))];
		ages.push('ALL');

		return ages.sort() as Array<string>;
	};

	const filterAge = (value: string): void => {
		dispatch(actions.filterByAge({ value }));
	};

	return (
		<div className="container-fluid units">
			<h1 className="title">Units Page</h1>

			<div className="age-filter-container">
				<h2 className="subtitle">Ages</h2>
				<div id="myBtnContainer">
					{getUniqueAgeTypes().map((age: string, index) => (
						<button
							key={index}
							className={'btn'}
							onClick={() => filterAge(age)}
						>
							{age}
						</button>
					))}
				</div>
			</div>

			<div className="cost-filter-container">
				<h2 className="subtitle">Costs</h2>
				{['Food', 'Wood', 'Gold'].map((costType, index) => (
					<FilterSlider
						index={index}
						key={costType}
						name={costType}
						checkboxStatus={filterStatus}
					/>
				))}
			</div>

			<Table units={units} />
		</div>
	);
};
