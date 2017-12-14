import { IApplicationState, initialState, columnTypes, IColumn, IData, IPaneSize, ICode } from "./State";
import { 
	ActionTypes, typeKeys, IUpdateDataRowAction, 
	IUpdateDataColumnNameAction, IUpdateDataColumnTypeAction,
	IAddDataRowAction, IRemoveDataRowAction,
	IAddDataColumnAction, IRemoveDataColumnAction, IPaneResizeAction,
	IUpdateEditorStringAction
} from "./Actions";
import { clone, forIn } from '@microsoft/sp-lodash-subset';
import { generateRowValue } from './ValueGeneration';

export const cfReducer = (state:IApplicationState = initialState, action:ActionTypes): IApplicationState => {
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
			break;
		case typeKeys.ADD_DATA_ROW:
			newState.data.rows = AddDataRowReducer(newState.data, action);
			break;
		case typeKeys.REMOVE_DATA_ROW:
			newState.data.rows = RemoveDataRowReducer(newState.data.rows, action);
			break;
		case typeKeys.ADD_DATA_COLUMN:
			newState.data = AddDataColumnReducer(newState.data, action);
			break;
		case typeKeys.REMOVE_DATA_COLUMN:
			newState.data = RemoveDataColumnReducer(newState.data, action);
			break;
		
		case typeKeys.PANE_RESIZE:
			newState.panes = PaneResizeReducer(newState.panes, action);
			break;
		case typeKeys.CHOOSE_THEME:
			newState.code.theme = action.theme;
			break;

		case typeKeys.UPDATE_EDITOR_STRING:
			newState.code = UpdateEditorStringReducer(newState.code, action);
			break;

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

//** Adds a new data row (and generates the row values) */
function AddDataRowReducer(data:IData, action:IAddDataRowAction): Array<Array<any>> {
	let newRow:Array<any> = new Array<any>();
	for (var column of data.columns){
		newRow.push(generateRowValue(column.type));
	}
	return [
		...data.rows,
		newRow
	];
}

//** Deletes a data row */
function RemoveDataRowReducer(rows:Array<Array<any>>, action:IRemoveDataRowAction): Array<Array<any>> {
	if (rows.length == 1) {
		//Never remove the last row
		return rows;
	}
	return [
		...rows.slice(0,action.rowIndex),
		...rows.slice(action.rowIndex + 1)
	];
}

//** Adds a new data column (always of type text with generated values) */
function AddDataColumnReducer(data:IData, action:IAddDataColumnAction): IData {
	//Ensure new column has a unique name
	let isUnique:boolean = false;
	let fieldCounter:number = 1;
	let fieldName:string = 'NewField';
	do {
		for(var column of data.columns){
			if(column.name == fieldName){
				fieldCounter++;
				fieldName = 'NewField' + fieldCounter.toString();
				continue;
			}
		}
		isUnique = true;
	} while(!isUnique);

	return {
		columns: [
			...data.columns,
			{
				name: fieldName,
				type: columnTypes.text
			}
		],
		rows: data.rows.map((row:Array<any>, rIndex:number) => {
			return [
				...row,
				generateRowValue(columnTypes.text)
			];
		})
	};
}

//** Removes a data column (add associated row values) */
function RemoveDataColumnReducer(data:IData, action:IRemoveDataColumnAction): IData {
	return {
		columns: [
			...data.columns.slice(0, action.colIndex),
			...data.columns.slice(action.colIndex + 1)
		],
		rows: data.rows.map((row:Array<any>, rIndex:number) => {
			return [
				...row.slice(0, action.colIndex),
				...row.slice(action.colIndex + 1)
			];
		})
	};
}


function PaneResizeReducer(panes:IPaneSize, action:IPaneResizeAction): IPaneSize {
	if(action.paneName == 'main'){
		return {
			...panes,
			main: action.size
		};
	}
	return {
		...panes,
		split: action.size
	};
}


function UpdateEditorStringReducer(code:ICode, action:IUpdateEditorStringAction): ICode {
	//purposely not making a fully new code object
	code.editorString = action.editorString;
	code.formatterString = action.editorString; //replace with validation check
	code.validationErrors = ["Bad things have happened!"];
	return code;
}