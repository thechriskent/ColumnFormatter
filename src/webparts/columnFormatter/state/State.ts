import { standardWizardStartingCode, standardWizardStartingColumns, standardWizardStartingRows } from '../components/Wizards/WizardCommon';

//#region Enums
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

export enum editorThemes {
	vs = "vs",
	vsDark = "vs-dark",
	hcBlack = "hc-black"
}

export enum uiState {
	welcome,
	editing
}
//#endregion

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

export interface IDataColumn {
	name: string;
	type: columnTypes;
}

export interface IData {
	columns: Array<IDataColumn>;
	rows: Array<Array<any>>;
}

export interface IPaneState {
	main: number;
	split: number;
}

export interface ITabState {
	propertyTab: number;
	viewTab: number;
	wizardTabVisible: boolean;
}

export interface IUI {
	state: uiState;
	panes: IPaneState;
	tabs: ITabState;
}

export interface ICode {
	validationErrors: Array<string>;
	formatterErrors: Array<string>;
	editorString: string;
	formatterString: string;
	theme: editorThemes;
	wizardName: string;
}

export interface IApplicationState {
	data: IData;
	ui: IUI;
	code: ICode;
}

export const initialState: IApplicationState = {
	data: {
		columns: [],
		rows: [],
	},
	ui: {
		state: uiState.welcome,
		panes: {
			main: 0,
			split: 0
		},
		tabs: {
			propertyTab: 0,
			viewTab: 0,
			wizardTabVisible: true
		}
	},
	code: {
		validationErrors: [],
		formatterErrors: [],
		editorString: '',
		formatterString:'',
		theme: editorThemes.vs,
		wizardName: undefined
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