import {
	IApplicationState, initialState, columnTypes, IDataColumn,
	IData, IPaneState, ICode, ITabState, uiState, IContext
} from "./State";
import { 
	ActionTypes, typeKeys, IUpdateDataRowAction, 
	IUpdateDataColumnNameAction, IUpdateDataColumnTypeAction,
	IAddDataRowAction, IRemoveDataRowAction,
	IAddDataColumnAction, IRemoveDataColumnAction, IPaneResizeAction,
	IUpdateEditorStringAction, ISelectTabAction, ISetContextAction,
	ILaunchEditorAction, IDisconnectWizardAction, ILaunchEditorWithCodeAction
} from "./Actions";
import { clone, forIn } from '@microsoft/sp-lodash-subset';
import { generateRowValue } from './ValueGeneration';
import {
	IWizard, getWizardByName, standardWizardStartingRows, 
	standardWizardStartingColumns, standardWizardStartingCode
} from "../components/Wizards/WizardCommon";

export const cfReducer = (state:IApplicationState = initialState, action:ActionTypes): IApplicationState => {
	let newState:IApplicationState = clone(state);

	switch (action.type) {

		case typeKeys.SET_CONTEXT:
			newState.context = SetContextReducer(newState.context, action);
			break;

		case typeKeys.LAUNCH_EDITOR:
			newState = LaunchEditorReducer(newState, action);
			break;
		case typeKeys.LAUNCH_EDITOR_WITH_CODE:
			newState = LaunchEditorWithCodeReducer(newState, action);
			break;
		case typeKeys.CHANGE_UISTATE:
			newState.ui.state = action.state;
			break;
		case typeKeys.DISCONNECT_WIZARD:
			newState.ui.tabs.wizardTabVisible = false;
			newState.ui.tabs.viewTab = 0;
			break;

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
		
		case typeKeys.SELECT_TAB:
			newState.ui.tabs = SelectTabReducer(newState.ui.tabs, action);
			break;
		case typeKeys.PANE_RESIZE:
			newState.ui.panes = PaneResizeReducer(newState.ui.panes, action);
			break;
		case typeKeys.CHOOSE_THEME:
			newState.code.theme = action.theme;
			break;

		case typeKeys.UPDATE_EDITOR_STRING:
			newState.code = UpdateEditorStringReducer(newState.code, action);
			break;
		case typeKeys.UPDATE_FORMATTER_ERRORS:
			newState.code.formatterErrors = action.formatterErrors;
			break;

		default:
			return state;
	}
	return newState;
};

function SetContextReducer(context:IContext, action:ISetContextAction): IContext {
	return {
		isOnline: action.isOnline,
		webAbsoluteUrl: action.webAbsoluteUrl
	};
}

function LaunchEditorReducer(state:IApplicationState, action:ILaunchEditorAction): IApplicationState {
	let wizard:IWizard = getWizardByName(action.wizardName);
	return {
		data: {
			columns: wizard !== undefined ? wizard.startingColumns(action.colType) : standardWizardStartingColumns(action.colType),
			rows: wizard !== undefined ? wizard.startingRows(action.colType) : standardWizardStartingRows(action.colType)
		},
		ui: {
			...state.ui,
			state: uiState.editing,
			tabs: {
				...state.ui.tabs,
				viewTab: (wizard !== undefined && !wizard.isTemplate) ? 0 : 2,
				wizardTabVisible: (wizard !== undefined && !wizard.isTemplate)
			}
		},
		code: {
			...state.code,
			validationErrors: [],
			formatterErrors: [],
			formatterString: wizard !== undefined ? wizard.startingCode(action.colType) : standardWizardStartingCode(action.colType),
			editorString: wizard !== undefined ? wizard.startingCode(action.colType) : standardWizardStartingCode(action.colType),
			wizardName: wizard !== undefined ? wizard.name : undefined
		},
		context: state.context
	};
}

function LaunchEditorWithCodeReducer(state:IApplicationState, action:ILaunchEditorWithCodeAction): IApplicationState {
	let wizard:IWizard = getWizardByName(action.wizardName);
	return {
		data: {
			columns: wizard !== undefined ? wizard.startingColumns(action.colType) : standardWizardStartingColumns(action.colType),
			rows: wizard !== undefined ? wizard.startingRows(action.colType) : standardWizardStartingRows(action.colType)
		},
		ui: {
			...state.ui,
			state: uiState.editing,
			tabs: {
				...state.ui.tabs,
				viewTab: (wizard !== undefined && !wizard.isTemplate) ? 0 : 2,
				wizardTabVisible: (wizard !== undefined && !wizard.isTemplate)
			}
		},
		code: {
			...state.code,
			validationErrors: action.validationErrors,
			formatterErrors: [],
			formatterString: action.editorString,
			editorString: action.editorString,
			wizardName: wizard !== undefined ? wizard.name : undefined
		},
		context: state.context
	};
}

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
function UpdateDataColumnNameReducer(columns:Array<IDataColumn>, action:IUpdateDataColumnNameAction): Array<IDataColumn> {
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


function SelectTabReducer(tabs:ITabState, action:ISelectTabAction): ITabState {
	if(action.tabName == 'view'){
		return {
			...tabs,
			viewTab: action.index
		};
	}
	return {
		...tabs,
		propertyTab: action.index
	};
}

function PaneResizeReducer(panes:IPaneState, action:IPaneResizeAction): IPaneState {
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
	if(action.validationErrors.length == 0) {
		code.formatterString = action.editorString;
	}
	code.validationErrors = action.validationErrors;
	return code;
}