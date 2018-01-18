import { IWizard, Wizards, standardWizardStartingColumns } from './WizardCommon';
import { IDataColumn, columnTypes } from '../../state/State';
import * as strings from 'ColumnFormatterWebPartStrings';

export const WizardInfoOverdue: IWizard = {
	name: strings.WizardInfoOverdueTitle,
	description:  strings.WizardInfoOverdueDesc,
	iconName: 'Warning',
	fieldTypes: [
		columnTypes.datetime
	],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		let today:Date = new Date();
		let tomorrow:Date = new Date(new Date().setTime(today.getTime() + 1 * 86400000));
		//today = new Date();
		let old = new Date(new Date().setTime(today.getTime() - 5 * 86400000));
		//today = new Date();
		let older = new Date(new Date().setTime(today.getTime() - 30 * 86400000));
		today = new Date(new Date().setTime(today.getTime() + 3600000));
		return [
			[today],
			[old],
			[tomorrow],
			[older]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "elmType": "div",',
			'  "txtContent": "@currentField",',
			'  "style": {',
			'    "color": {',
			'      "operator": "?",',
			'      "operands": [',
			'        {',
			'          "operator": "<=",',
			'          "operands": [',
			'            "@currentField",',
			'            "@now"',
			'          ]',
			'        },',
			'        "#a80000",',
			'        ""',
			'      ]',
			'    }',
			'  }',
			'}'
		].join('\n');
	}
};
