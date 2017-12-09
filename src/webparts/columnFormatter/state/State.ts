export enum columnTypes {
	text,
	number,
	choice,
	person,
	boolean,
	link,
	datetime,
	lookup
}

export interface ILookupFieldValue {
	lookupValue: string;
	lookupId: number;
}

export interface ILinkFieldValue {
	URL: string;
	desc: string;
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
			name: 'someLink',
			type: columnTypes.link
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
			["Dog", {URL:"http://google.com",desc:"Google"}, {lookupValue:"Main",lookupId:3}, false],
			["Cat", {URL:"http://bing.com",desc:"Bing"}, {lookupValue:"West",lookupId:1}, true],
			["Mouse", {URL:"https://thechriskent.com",desc:"Chris' Blog"}, {lookupValue:"East",lookupId:7}, true]
		]
	}
};