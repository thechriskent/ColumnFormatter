import { columnTypes, editorThemes, uiState } from './State';

export type ActionTypes = 
	| ILaunchEditorAction
	| IChangeUIStateAction
	| IUpdateDataRowAction
	| IUpdateDataColumnNameAction
	| IUpdateDataColumnTypeAction
	| IAddDataRowAction
	| IRemoveDataRowAction
	| IAddDataColumnAction
	| IRemoveDataColumnAction
	| ISelectTabAction
	| IPaneResizeAction
	| IChooseThemeAction
	| IUpdateEditorStringAction
	| IUpdateFormatterErrorsAction
	| IOtherAction;

export enum typeKeys {
	LAUNCH_EDITOR = "LAUNCH_EDITOR",
	CHANGE_UISTATE = "CHANGE_UISTATE",

	UPDATE_DATA_ROW = "UPDATE_DATA_ROW",
	UPDATE_DATA_COLUMN_NAME = "UPDATE_DATA_COLUMN_NAME",
	UPDATE_DATA_COLUMN_TYPE = "UPDATE_DATA_COLUMN_TYPE",
	ADD_DATA_ROW = "ADD_DATA_ROW",
	REMOVE_DATA_ROW = "REMOVE_DATA_ROW",
	ADD_DATA_COLUMN = "ADD_DATA_COLUMN",
	REMOVE_DATA_COLUMN = "REMOVE_DATA_COLUMN",

	SELECT_TAB = "SELECT_TAB",
	PANE_RESIZE = "PANE_RESIZE",
	CHOOSE_THEME = "CHOOSE_THEME",

	UPDATE_EDITOR_STRING = "UPDATE_EDITOR_STRING",
	UPDATE_FORMATTER_ERRORS = "UPDATE_FORMATTER_ERRORS",

	OTHER_ACTION = "ANY_OTHER_ACTION"
}

export interface ILaunchEditorAction {
	type: typeKeys.LAUNCH_EDITOR;
	wizardName: string;
	colType: columnTypes;
}
export const launchEditor = (wizardName:string, colType:columnTypes): ILaunchEditorAction => ({
	type: typeKeys.LAUNCH_EDITOR,
	wizardName,
	colType
});

export interface IChangeUIStateAction {
	type: typeKeys.CHANGE_UISTATE;
	state: uiState;
}
export const changeUIState = (state:uiState): IChangeUIStateAction => ({
	type: typeKeys.CHANGE_UISTATE,
	state
});


export interface IUpdateDataRowAction {
	type: typeKeys.UPDATE_DATA_ROW;
	rowIndex: number;
	colIndex: number;
	value: any;
}
export const updateDataRow = (rowIndex: number, colIndex: number, value: any): IUpdateDataRowAction => ({
	type: typeKeys.UPDATE_DATA_ROW,
	rowIndex,
	colIndex,
	value
});

export interface IUpdateDataColumnNameAction {
	type: typeKeys.UPDATE_DATA_COLUMN_NAME;
	colIndex: number;
	name: string;
}
export const updateDataColumnName = (colIndex: number, name: string): IUpdateDataColumnNameAction => ({
	type: typeKeys.UPDATE_DATA_COLUMN_NAME,
	colIndex,
	name
});

export interface IUpdateDataColumnTypeAction {
	type: typeKeys.UPDATE_DATA_COLUMN_TYPE;
	colIndex: number;
	colType: columnTypes;
}
export const updateDataColumnType = (colIndex: number, colType: columnTypes): IUpdateDataColumnTypeAction => ({
	type: typeKeys.UPDATE_DATA_COLUMN_TYPE,
	colIndex,
	colType
});

export interface IAddDataRowAction {
	type: typeKeys.ADD_DATA_ROW;
}
export const addDataRow = (): IAddDataRowAction => ({
	type: typeKeys.ADD_DATA_ROW
});

export interface IRemoveDataRowAction {
	type: typeKeys.REMOVE_DATA_ROW;
	rowIndex: number;
}
export const removeDataRow = (rowIndex:number): IRemoveDataRowAction => ({
	type: typeKeys.REMOVE_DATA_ROW,
	rowIndex
});

export interface IAddDataColumnAction {
	type: typeKeys.ADD_DATA_COLUMN;
}
export const addDataColumn = (): IAddDataColumnAction => ({
	type: typeKeys.ADD_DATA_COLUMN
});

export interface IRemoveDataColumnAction {
	type: typeKeys.REMOVE_DATA_COLUMN;
	colIndex: number;
}
export const removeDataColumn = (colIndex:number): IRemoveDataColumnAction => ({
	type: typeKeys.REMOVE_DATA_COLUMN,
	colIndex
});


export interface ISelectTabAction {
	type: typeKeys.SELECT_TAB;
	tabName: string;
	index: number;
}
export const selectTab = (tabName:string, index:number): ISelectTabAction => ({
	type: typeKeys.SELECT_TAB,
	tabName,
	index
});

export interface IPaneResizeAction {
	type: typeKeys.PANE_RESIZE;
	paneName: string;
	size: number;
}
export const resizePane = (paneName:string, size:number): IPaneResizeAction => ({
	type: typeKeys.PANE_RESIZE,
	paneName,
	size
});

export interface IChooseThemeAction {
	type: typeKeys.CHOOSE_THEME;
	theme: editorThemes;
}
export const chooseTheme = (theme:editorThemes): IChooseThemeAction => ({
	type: typeKeys.CHOOSE_THEME,
	theme
});


export interface IUpdateEditorStringAction {
	type: typeKeys.UPDATE_EDITOR_STRING;
	editorString: string;
	validationErrors: Array<string>;
}
export const updateEditorString = (editorString:string, validationErrors: Array<string>): IUpdateEditorStringAction => ({
	type: typeKeys.UPDATE_EDITOR_STRING,
	editorString,
	validationErrors
});

export interface IUpdateFormatterErrorsAction {
	type: typeKeys.UPDATE_FORMATTER_ERRORS;
	formatterErrors: Array<string>;
}
export const updateFormatterErrors = (formatterErrors:Array<string>): IUpdateFormatterErrorsAction => ({
	type: typeKeys.UPDATE_FORMATTER_ERRORS,
	formatterErrors
});


export interface IOtherAction {
	type: typeKeys.OTHER_ACTION;
}