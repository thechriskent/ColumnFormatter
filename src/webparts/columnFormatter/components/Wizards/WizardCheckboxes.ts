import { IWizard, Wizards, standardWizardStartingColumns } from './WizardCommon';
import { IDataColumn, columnTypes } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';

export const WizardInfoCheckboxes: IWizard = {
	name: 'Checkboxes',
	description: 'Displays Yes/No fields as checkboxes',
	iconName: 'CheckboxComposite',
	fieldTypes: [
		columnTypes.boolean
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		return [
			[true],
			[false],
			[true],
			[false]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "attributes": {',
			'    "iconName": {',
			'      "operator": "?",',
			'      "operands": [',
			'        "@currentField",',
			'        "CheckboxComposite",',
			'        "Checkbox"',
			'      ]',
			'    }',
			'  },',
			'  "style": {',
			'    "font-size":"large",',
			'    "color":"black"',
			'  }',
			'}'
		].join('\n');
	}
};