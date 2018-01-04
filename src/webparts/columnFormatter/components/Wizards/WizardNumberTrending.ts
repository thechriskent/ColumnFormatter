import * as strings from 'ColumnFormatterWebPartStrings';

import { columnTypes, IDataColumn } from '../../state/State';
import { generateRowValue } from '../../state/ValueGeneration';
import { IWizard } from './WizardCommon';

export const WizardNumberTending: IWizard = {
	name: strings.WizardNumberTrendingName,
	description: strings.WizardNumberTrendingDescription,
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