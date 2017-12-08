export type ActionTypes = 
	| IUpdateDataRowAction
	| IOtherAction;

export enum typeKeys {
	UPDATE_DATA_ROW = "UPDATE_DATA_ROW",
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

export interface IOtherAction {
	type: typeKeys.OTHER_ACTION;
}