export enum columnTypes {
	text,
	number,
	choice,
	person,
	boolean,
	link,
	picture,
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

export interface IPersonFieldValue {
	title: string;
	id: number;
	email: string;
	sip: string;
	picture: string;
}

export interface IColumn {
	name: string;
	type: columnTypes;
}

export interface IData {
	columns: Array<IColumn>;
	rows: Array<Array<any>>;
}

export interface IPaneSize {
	main: number;
	split: number;
}

export enum editorThemes {
	vs = "vs",
	vsDark = "vs-dark",
	hcBlack = "hc-black"
}

export interface ICode {
	isValid: boolean;
	editorString: string;
	formatterString: string;
	theme: editorThemes;
}

export interface IApplicationState {
	data: IData;
	panes: IPaneSize;
	code: ICode;
}

const starterCode:string = [
	'{',
    '  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
    '  "elmType": "div",',
	'  "txtContent": "@currentField"',
	'}'
].join('\n');

export const initialState: IApplicationState = {
	data: {
		columns: [{
			name: 'currentField',
			type: columnTypes.text
		}],
		rows: [
			["Damp Grandpa"],
			["Evil Waffle"],
			["Shiny Chicken"]
		]
	},
	panes: {
		main: 0,
		split: 0
	},
	code: {
		isValid: true,
		editorString: starterCode,
		formatterString: starterCode,
		theme: editorThemes.vs
	}
};

/*export const initialState: IApplicationState = {
	data: {
		columns: [{
			name: 'currentField',
			type: columnTypes.text
		},
		{
			name: 'somePerson',
			type: columnTypes.person
		},
		{
			name: 'someNum',
			type: columnTypes.number
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
			["Dog", {title:'Donkey Kong', id:1,email:'donkey@kong.com',sip:'donkey@kong.com',picture:''}, 4, {URL:"http://google.com",desc:"Google"}, {lookupValue:"Main",lookupId:3}, false],
			["Cat", {title:'Mario Bro', id:1,email:'mario@nintendo.com',sip:'mario@nintendo.com',picture:''}, -37, {URL:"http://bing.com",desc:"Bing"}, {lookupValue:"West",lookupId:1}, true],
			["Mouse", {title:'Luigi Bro', id:1,email:'luigi@nintendo.com',sip:'luigi@nintendo.com',picture:''}, 9.3478, {URL:"https://thechriskent.com",desc:"Chris' Blog"}, {lookupValue:"East",lookupId:7}, true]
		]
	}
};*/