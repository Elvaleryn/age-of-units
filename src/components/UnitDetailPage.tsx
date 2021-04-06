import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../config/rootReducer';
import { actions } from '../redux/unit';
import { IUnit } from '../model/unit.model';
import { useParams } from 'react-router-dom';
import { UnitDetail } from './Unitdetail';
export const UnitDetailPage = () => {
	const dispatch = useDispatch();
	const serviceResponse = useSelector((state: IRootState) => state.unit.units);

	const getUnit = (): Array<IUnit> => {
		let units = serviceResponse;
		console.log(units);
		return units;
	};

	let { id } = useParams<{ id?: string | undefined }>();
	console.log(id);

	useEffect(() => {
		dispatch(actions.fetchUnit(id));
	}, [dispatch, id]);

	return <div>{getUnit().length && <UnitDetail item={getUnit()[0]} />}</div>;
};
