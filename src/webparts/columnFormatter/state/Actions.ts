import { columnTypes } from './State';

export type ActionTypes = 
	| IUpdateDataRowAction
	| IUpdateDataColumnNameAction
	| IUpdateDataColumnTypeAction
	| IAddDataRowAction
	| IRemoveDataRowAction
	| IAddDataColumnAction
	| IRemoveDataColumnAction
	| IOtherAction;

export enum typeKeys {
	UPDATE_DATA_ROW = "UPDATE_DATA_ROW",
	UPDATE_DATA_COLUMN_NAME = "UPDATE_DATA_COLUMN_NAME",
	UPDATE_DATA_COLUMN_TYPE = "UPDATE_DATA_COLUMN_TYPE",
	ADD_DATA_ROW = "ADD_DATA_ROW",
	REMOVE_DATA_ROW = "REMOVE_DATA_ROW",
	ADD_DATA_COLUMN = "ADD_DATA_COLUMN",
	REMOVE_DATA_COLUMN = "REMOVE_DATA_COLUMN",
	OTHER_ACTION = "ANY_OTHER_ACTION"
}

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

export interface IOtherAction {
	type: typeKeys.OTHER_ACTION;
}