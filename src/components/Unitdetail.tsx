/* eslint-disable jsx-a11y/img-redundant-alt */
import { IUnit } from '../model/unit.model';
import { useHistory } from 'react-router-dom';

interface UnitDetailProps {
	item: IUnit;
}
export const UnitDetail = ({ item }: UnitDetailProps) => {
	const history = useHistory();

	const handleGoBack = () => {
		history.push('/units');
	};

	return (
		<div className="container-fluid unit-detail">
			<h2 className="title">Unit Detail Page</h2>
			<button className="btn" onClick={handleGoBack}>
				Go Back
			</button>
			<table className="table-detail">
				<thead>
					<tr>
						<th>ID:</th>
						<td>{item.id}</td>
					</tr>
					<tr>
						<th scope="row">Name:</th>
						<td>{item.name}</td>
					</tr>
					<tr>
						<th scope="row">Description:</th>
						<td>{item.description}</td>
					</tr>
					<tr>
						<th scope="row"> Age:</th>
						<td>{item.age}</td>
					</tr>
					<tr>
						<th scope="row">Wood Cost:</th>
						<td>{item.cost?.Wood}</td>
					</tr>
					<tr>
						<th scope="row">Food Cost</th>
						<td>{item.cost?.Food}</td>
					</tr>
					<tr>
						<th scope="row">Gold Cost</th>
						<td>{item.cost?.Gold}</td>
					</tr>
					<tr>
						<th scope="row">Build Time</th>
						<td>{item?.build_time}</td>
					</tr>
					<tr>
						<th scope="row">Reload Time</th>
						<td>{item?.reload_time}</td>
					</tr>
					<tr>
						<th scope="row">Hit Point</th>
						<td>{item?.hit_points}</td>
					</tr>
					<tr>
						<th scope="row">Attack</th>
						<td>{item?.attack}</td>
					</tr>
					<tr>
						<th scope="row">Accuracy</th>
						<td>{item?.accuracy}</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
};
