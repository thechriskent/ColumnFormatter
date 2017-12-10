import { IApplicationState, initialState, columnTypes, IColumn, IData } from "./State";
import { 
	ActionTypes, typeKeys, IUpdateDataRowAction, 
	IUpdateDataColumnNameAction, IUpdateDataColumnTypeAction
} from "./Actions";
import { clone } from '@microsoft/sp-lodash-subset';
import { generateRowValue } from './ValueGeneration';

export const dataReducer = (state:IApplicationState = initialState, action:ActionTypes): IApplicationState => {
	let newState:IApplicationState = clone(state);

	switch (action.type) {
		case typeKeys.UPDATE_DATA_ROW:
			newState.data.rows = UpdateDataRowReducer(newState.data.rows, action);
			break;
		case typeKeys.UPDATE_DATA_COLUMN_NAME:
			newState.data.columns = UpdateDataColumnNameReducer(newState.data.columns, action);
			break;
		case typeKeys.UPDATE_DATA_COLUMN_TYPE:
			newState.data = UpdateDataColumnTypeReducer(newState.data, action);
			return newState;
		default:
			return state;
	}
	return newState;
};

//** Changes the value of the specified row and column */
function UpdateDataRowReducer(rows:Array<Array<any>>, action:IUpdateDataRowAction): Array<Array<any>> {
	return [
		...rows.slice(0, action.rowIndex),
		[
			...rows[action.rowIndex].slice(0, action.colIndex),
			action.value,
			...rows[action.rowIndex].slice(action.colIndex + 1)],
		...rows.slice(action.rowIndex + 1)
	];
}

//** Changes the name of the specified column */
function UpdateDataColumnNameReducer(columns:Array<IColumn>, action:IUpdateDataColumnNameAction): Array<IColumn> {
	return [
		...columns.slice(0, action.colIndex),
		{
			...columns[action.colIndex],
			name: action.name
		},
		...columns.slice(action.colIndex + 1)
	];
}

//** Changes the type of the specified column (and regenerates the row values as well) */
function UpdateDataColumnTypeReducer(data:IData, action:IUpdateDataColumnTypeAction): IData {
	return {
		columns: [
			...data.columns.slice(0, action.colIndex),
			{
				...data.columns[action.colIndex],
				type: action.colType
			},
			...data.columns.slice(action.colIndex + 1)
		],
		rows: data.rows.map((row:Array<any>, rIndex:number) => {
			return [
				...row.slice(0, action.colIndex),
				generateRowValue(action.colType),
				...row.slice(action.colIndex + 1)];
		})
	};
}