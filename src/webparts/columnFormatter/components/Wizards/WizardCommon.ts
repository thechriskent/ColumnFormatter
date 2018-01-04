import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { WizardInfoCheckboxes } from './WizardCheckboxes';
import { WizardInfoDataBars } from './WizardDataBars';
import { WizardInfoNumberTending } from './WizardNumberTrending';
import { WizardInfoOverdue } from './WizardOverdue';

//** Implement this interface to create your own wizard/template */
export interface IWizard {
	//** Name of the wizard */
	name: string;

	//** Description of the wizard (shown in a tooltip) */
	description: string;

	//** The name of the UI Fabric icon to use for the wizard */
	iconName: string;

	//** field types supported, leave empty to support all */
	fieldTypes: Array<columnTypes>;

	//** Indicates if this is a wizard with a custom render or just starter code */
	isTemplate: boolean;

	//** callback that should return the initial json for the wizard */
	startingCode: (colType:columnTypes) => string;

	//** callback that should return the initial sample data */
	startingRows: (colType:columnTypes) => Array<Array<any>>;

	//** callback that should return the initial sample column definitions */
	startingColumns: (colType:columnTypes) => Array<IDataColumn>;

	//** callback that allows wizards (not templates) to create a custom interface in the Wizard tab */
	onWizardRender?: (updateEditorString:(editorString:string) => void) => JSX.Element;
}

//** The actual array of wizards/templates. Add yours here */
export const Wizards: Array<IWizard> = [
	WizardInfoDataBars,
	WizardInfoNumberTending,
	WizardInfoCheckboxes,
	WizardInfoOverdue
];


//** Helper function that generates 3 random rows, use it for simple wizards/templates */
export const standardWizardStartingRows = (colType:columnTypes): Array<Array<any>> => {
	return [
		[generateRowValue(colType)],
		[generateRowValue(colType)],
		[generateRowValue(colType)]
	];
};

//** Helper function that generates a single column, use it for simple wizards/templates */
export const standardWizardStartingColumns = (colType:columnTypes): Array<IDataColumn> => {
	return [{
		name: strings.WizardDefaultField,
		type: colType
	}];
};

//** Helper function that generates the most basic json */
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


//** Helper function used to get a wizard from the wizards array by name */
export const getWizardByName = (name:string): IWizard | undefined => {
	for(var wizard of Wizards) {
		if(wizard.name == name) {
			return wizard;
		}
	}
	return undefined;
};

//** Helper function used to filter the wizards by supported field types */
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