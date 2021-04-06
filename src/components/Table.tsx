import { IUnit } from '../model/unit.model';
import { useHistory } from 'react-router-dom';

interface TableProps {
	units: Array<IUnit>;
}

export const Table = ({ units }: TableProps) => {
	const history = useHistory();

	const handleClick = (item: any) => {
		history.push('/unit/' + item.id);
	};

	const getCosts = (item: any) => {
		if (item === null) return `N/A`;

		if (item.Food !== undefined && item.Gold !== undefined)
			return `Food = ${item.Food}, Gold = ${item.Gold}`;
		if (item.Wood !== undefined && item.Gold !== undefined)
			return `Wood = ${item.Wood}, Gold = ${item.Gold}`;
		if (item.Food !== undefined && item.Wood !== undefined)
			return `Food = ${item.Food}, Wood =${item.Wood}`;
		if (item.Food !== undefined) return `Food = ${item.Food}`;
		if (item.Wood !== undefined) return `Wood = ${item.Wood}`;
		if (item.Gold !== undefined) return `Gold = ${item.Gold}`;
	};

	return (
		<div className="unit-table-container">
			<table className="table">
				<thead>
					<tr>
						<th scope="col">id</th>
						<th scope="col">name</th>
						<th scope="col">age</th>
						<th scope="col">costs</th>
					</tr>
				</thead>
				<tbody>
					{units.map((item: IUnit, index) => (
						<tr key={index} onClick={() => handleClick(item)}>
							<td> {item.id} </td>
							<td> {item.name} </td>
							<td> {item.age} </td>
							<td> {getCosts(item.cost)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
