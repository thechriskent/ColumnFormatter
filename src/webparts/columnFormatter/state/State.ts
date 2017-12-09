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
			name: 'someBool',
			type: columnTypes.boolean
		}],
		rows: [
			["Dog", false],
			["Cat", true],
			["Mouse", true]
		]
	}
};