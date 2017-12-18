import { IWizard, Wizards } from './WizardCommon';
import { IDataColumn, columnTypes } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';

export const WizardInfoNumberTending: IWizard = {
	name: '# Trending',
	description: 'Compares other fields in the row to provide an icon based on trending values',
	iconName: 'Sort',
	fieldTypes: [],
	isTemplate: true,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {
		return [
			{
				name: 'Trending',
				type: colType
			},
			{
				name: 'Before',
				type: columnTypes.number
			},
			{
				name: 'After',
				type: columnTypes.number
			}
		];
	},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		let mainVal:string;
		if(colType == columnTypes.choice || colType == columnTypes.text) {
			mainVal = '';
		}
		return [
			[mainVal == undefined ? generateRowValue(colType) : mainVal, 400, 500],
			[mainVal == undefined ? generateRowValue(colType) : mainVal, 200, 100],
			[mainVal == undefined ? generateRowValue(colType) : mainVal, 100, 200],
			[mainVal == undefined ? generateRowValue(colType) : mainVal, 10, 5]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
			'  "debugMode": true,',
			'  "elmType": "div",',
			'  "children": [',
			'    {',
			'      "elmType": "span",',
			'      "attributes": {',
			'        "class": {',
			'          "operator": "?",',
			'          "operands": [',
			'            {',
			'              "operator": ">",',
			'              "operands": [',
			'                "[$After]",',
			'                "[$Before]"',
			'              ]',
			'            },',
			'            "sp-field-trending--up",',
			'            "sp-field-trending--down"',
			'          ]',
			'        },',
			'        "iconName": {',
			'          "operator": "?",',
			'          "operands": [',
			'            {',
			'              "operator": ">",',
			'              "operands": [',
			'                "[$After]",',
			'                "[$Before]"',
			'              ]',
			'            },',
			'            "SortUp",',
			'            {',
			'              "operator": "?",',
			'              "operands": [',
			'                {',
			'                  "operator": "<",',
			'                  "operands": [',
			'                    "[$After]",',
			'                    "[$Before]"',
			'                  ]',
			'                },',
			'                "SortDown",',
			'                ""',
			'              ]',
			'            }',
			'          ]',
			'        }',
			'      }',
			'    },',
			'    {',
			'      "elmType": "span",',
			'      "txtContent": "[$After]"',
			'    }',
			'  ]',
			'}'
		].join('\n');
	}
};