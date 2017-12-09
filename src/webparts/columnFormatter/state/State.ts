export enum columnTypes {
	text,
	number,
	choice,
	person,
	boolean,
	hyperlink,
	picture,
	datetime,
	lookup
}

export interface ILookupFieldValue {
	lookupValue: string;
	lookupId: number;
}

export interface IColumn {
	name: string;
	type: columnTypes;
}

export interface IData {
	columns: Array<IColumn>;
	rows: Array<Array<any>>;
}

export interface IApplicationState {
	data: IData;
}

export const initialState: IApplicationState = {
	data: {
		columns: [{
			name: 'currentField',
			type: columnTypes.text
		},
		{
			name: 'someLookup',
			type: columnTypes.lookup
		},
		{
			name: 'someBool',
			type: columnTypes.boolean
		}],
		rows: [
			["Dog", {lookupValue:"Main",lookupId:3}, false],
			["Cat", {lookupValue:"West",lookupId:1}, true],
			["Mouse", {lookupValue:"East",lookupId:7}, true]
		]
	}
};