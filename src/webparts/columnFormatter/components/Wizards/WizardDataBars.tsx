import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IWizard, Wizards, standardWizardStartingColumns } from './WizardCommon';
import { columnTypes, IDataColumn } from '../../state/State';

export const WizardInfoDataBars: IWizard = {
	name: 'Data Bars',
	description: 'Adds horizontal bars to the field to visually express the value by length',
	iconName: 'BarChartHorizontal',
	fieldTypes: [
		columnTypes.number
	],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes): Array<Array<any>> => {
		return [
			[10],
			[4],
			[20],
			[1]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return [
			'{',
			'  "debugMode": true,',
			'  "elmType": "div",',
			'  "txtContent": "@currentField",',
			'  "attributes": {',
			'    "class": "sp-field-dataBars"',
			'  },',
			'  "style": {',
			'    "width": {',
			'      "operator": "?",',
			'      "operands": [',
			'        {',
			'          "operator": ">",',
			'          "operands": [',
			'            "@currentField",',
			'            "20"',
			'          ]',
			'        },',
			'        "100%",',
			'        {',
			'          "operator": "+",',
			'          "operands": [',
			'            {',
			'              "operator": "toString()",',
			'              "operands": [',
			'                {',
			'                  "operator": "*",',
			'                  "operands": [',
			'                    "@currentField",',
			'                    5',
			'                  ]',
			'                }',
			'              ]',
			'            },',
			'            "%"',
			'          ]',
			'        }',
			'      ]',
			'    }',
			'  }',
			'}'
		].join('\n');
	}
};

export interface IWizardDataBarsProps {

}

export interface IWizardDataBarsState {
	
}

export class WizardDataBars extends React.Component<IWizardDataBarsProps, IWizardDataBarsState> {

	private _container: HTMLElement;
	
	public constructor(){
		super();
		this.state = {
			typeChooserVisible: false
		};
	}

	public render(): React.ReactElement<IWizardDataBarsProps> {
		return (
			<div>
				Wizard Data Bars
			</div>
		);
	}
}