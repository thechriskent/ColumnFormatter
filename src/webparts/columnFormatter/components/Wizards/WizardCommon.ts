import { columnTypes, IDataColumn } from '../../state/State';
import { WizardInfoDataBars } from './WizardDataBars';
import { WizardInfoNumberTending } from './WizardNumberTrending';
import { WizardInfoCheckboxes } from './WizardCheckboxes';
import { generateRowValue } from '../../state/ValueGeneration';

export interface IWizard {
	name: string;
	description: string;
	iconName: string;
	fieldTypes: Array<columnTypes>;
	isTemplate: boolean;
	startingCode: (colType:columnTypes) => string;
	startingRows: (colType:columnTypes) => Array<Array<any>>;
	startingColumns: (colType:columnTypes) => Array<IDataColumn>;
	onWizardRender?: (updateEditorString:(editorString:string) => void) => JSX.Element;
}

export const standardWizardStartingRows = (colType:columnTypes): Array<Array<any>> => {
	return [
		[generateRowValue(colType)],
		[generateRowValue(colType)],
		[generateRowValue(colType)]
	];
};

export const standardWizardStartingColumns = (colType:columnTypes): Array<IDataColumn> => {
	return [{
		name: 'MyField',
		type: colType
	}];
};

export const standardWizardStartingCode = (colType:columnTypes): string => {
	let currentField:string = '@currentField';
	switch(colType) {
		case columnTypes.lookup:
			currentField = '@currentField.lookupValue';
			break;
		case columnTypes.person:
			currentField = '@currentField.title';
			break;
		default:
			break;
	}
	return [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "elmType": "div",',
		'  "txtContent": "' + currentField + '"',
		'}'
	].join('\n');
};


export const Wizards: Array<IWizard> = [
	WizardInfoDataBars,
	WizardInfoNumberTending,
	WizardInfoCheckboxes,
	{
		name: 'Mail',
		description: 'Testing Purposes, not a real wizard',
		iconName: 'Mail',
		fieldTypes: [],
		isTemplate: true,
		startingCode: (colType:columnTypes): string => {
			return [
				'{',
				'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
				'  "elmType": "div",',
				'  "txtContent": {',
				'    "operator": "+",',
				'    "operands": [',
				'      "FAKE:",',
				'      "@currentField"',
				'    ]',
				'  }',
				'}'
			].join('\n');
		},
		startingRows: standardWizardStartingRows,
		startingColumns: standardWizardStartingColumns
	}
];

export const getWizardByName = (name:string): IWizard | undefined => {
	for(var wizard of Wizards) {
		if(wizard.name == name) {
			return wizard;
		}
	}
	return undefined;
};

export const getWizardsForColumnType = (colType: columnTypes): Array<IWizard> => {
	return Wizards.filter((value: IWizard, index:number) => {
		if(colType !== undefined) {
			if(value.fieldTypes.length == 0 || value.fieldTypes.indexOf(colType) >= 0) {
				return true;
			}
			return false;
		}
		return true;
	});
};