import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IWizard, Wizards, standardWizardStartingColumns } from './WizardCommon';
import { IDataColumn, columnTypes } from '../../state/State';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';


const emptyBarStyle: Partial<ISpinButtonStyles> = {
	labelWrapper: {
		paddingRight: '5px'
	},
	spinButtonWrapper: {
		paddingLeft: '1px'
	}
};

export interface IWizardDataBarsProps {
	emptyBarValue:number;
	fullBarValue:number;
	updateValues:(emptyBarValue:number, fullBarValue:number, valueDisplay:string) => void;
}

export interface IWizardDataBarsState {
	emptyBarValue:number;
	fullBarValue:number;
	valueDisplay:string;
}

export class WizardDataBars extends React.Component<IWizardDataBarsProps, IWizardDataBarsState> {

	private _container: HTMLElement;
	
	public constructor(props:IWizardDataBarsProps){
		super(props);

		this.state = {
			emptyBarValue: props.emptyBarValue,
			fullBarValue: props.fullBarValue,
			valueDisplay: 'value'
		};
	}

	public render(): React.ReactElement<IWizardDataBarsProps> {
		return (
			<div>
				<span className={styles.wizardGroupLabel}>{strings.WizardDataBarsRangeGroupLabel}</span>
				<SpinButton
				 value={this.state.emptyBarValue.toString()}
				 label={strings.WizardDataBarsEmptyBarLabel}
				 labelPosition={Position.start}
				 title={strings.WizardDataBarsEmptyBarTooltip}
				 styles={emptyBarStyle}
				 onValidate={this.onValidateEmptyBarValue}
				 onIncrement={this.onIncrementEmptyBarValue}
				 onDecrement={this.onDecrementEmptyBarValue}/>
				<SpinButton
				 value={this.state.fullBarValue.toString()}
				 label={strings.WizardDataBarsFullBarLabel}
				 title={strings.WizardDataBarsFullBarTooltip}
				 labelPosition={Position.start}
				 onValidate={this.onValidateFullBarValue}
				 onIncrement={this.onIncrementFullBarValue}
				 onDecrement={this.onDecrementFullBarValue}/>
				<span className={styles.wizardGroupLabel}>{strings.WizardDataBarsValueDisplayGroupLabel}</span>
				<ChoiceGroup
				 selectedKey={this.state.valueDisplay}
				 onChange={this.onValueDisplayChange}
				 options={[
					{ key: 'value', text: strings.WizardDataBarsValueDisplayActual},
					{ key: 'percentage', text: strings.WizardDataBarsValueDisplayPercentage},
					{ key: 'none', text: strings.WizardDataBarsValueDisplayNone}
				 ]}/>
			</div>
		);
	}

	@autobind
	private onValidateEmptyBarValue(value:string): string {
		if(isNaN(+value)){
			value = this.props.emptyBarValue.toString();
		}
		let numValue: number = +value;
		if(numValue < 0) {
			numValue = 0;
		}
		this.props.updateValues(numValue, this.state.fullBarValue, this.state.valueDisplay);
		this.setState({
			emptyBarValue: numValue
		});
		return numValue.toString();
	}

	@autobind
	private onIncrementEmptyBarValue(value:string): string {
		let newValue: number = +value + 1;
		return this.onValidateEmptyBarValue(newValue.toString());
	}

	@autobind
	private onDecrementEmptyBarValue(value:string): string {
		let newValue: number = +value - 1;
		return this.onValidateEmptyBarValue(newValue.toString());
	}

	@autobind
	private onValidateFullBarValue(value:string): string {
		if(isNaN(+value)){
			value = this.props.fullBarValue.toString();
		}
		let numValue: number = +value;
		if(numValue < this.state.emptyBarValue) {
			numValue = this.state.emptyBarValue + 1;
		}
		this.props.updateValues(this.state.emptyBarValue, numValue, this.state.valueDisplay);
		this.setState({
			fullBarValue: numValue
		});
		return numValue.toString();
	}

	@autobind
	private onIncrementFullBarValue(value:string): string {
		let newValue: number = +value + 1;
		return this.onValidateFullBarValue(newValue.toString());
	}

	@autobind
	private onDecrementFullBarValue(value:string): string {
		let newValue: number = +value - 1;
		return this.onValidateFullBarValue(newValue.toString());
	}

	@autobind
	private onValueDisplayChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
	  this.props.updateValues(this.state.emptyBarValue, this.state.fullBarValue, option.key);
	  this.setState({
		  valueDisplay: option.key
	  });
	}
}


const calculateCode = (emptyBarValue:number, fullBarValue:number, valueDisplay:string): string => {
	let percentage:number = 100 / (fullBarValue - emptyBarValue);
	
	let txtContent:string = '  "txtContent": "@currentField",';
	if(valueDisplay == 'none') {
		txtContent = '  "txtContent": "",';
	}
	if(valueDisplay == 'percentage') {
		txtContent = ['  "txtContent": {',
		              '    "operator": "+",',
					  '    "operands": [',
					  '      {',
					  '        "operator": "toString()",',
					  '        "operands": [',
					  '          {',
					  '            "operator": "*",',
					  '            "operands": [',
					  '              ' + percentage + ',',
					  '              {',
					  '                "operator": "-",',
					  '                "operands":[',
					  '                  "@currentField",',
					  '                 ' + emptyBarValue,
					  '                ]',
					  '              }',
					  '            ]',
					  '          }',
					  '        ]',
					  '      },',
					  '      " %"',
					  '    ]',
					  '  },'
					].join('\n');
	}

	return [
		'{',
		'  "debugMode": true,',
		'  "elmType": "div",',
		txtContent,
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
		'            ' + fullBarValue.toString(),
		'          ]',
		'        },',
		'        "100%",',
		'        {',  
		'          "operator": "?",',
		'          "operands": [',
		'            {',
		'              "operator": "<",',
		'              "operands": [',
		'                "@currentField",',
		'                ' + emptyBarValue.toString(),
		'              ]',
		'            },',
		'            "0",',
		'            {',
		'              "operator": "+",',
		'              "operands": [',
		'                {',
		'                  "operator": "toString()",',
		'                  "operands": [',
		'                    {',
		'                      "operator": "*",',
		'                      "operands": [',
		'                        ' + percentage + ',',
		'                        {',
		'                          "operator": "-",',
		'                          "operands":[',
	    '                            "@currentField",',
		'                            ' + emptyBarValue.toString(),
		'                          ]',
		'                        }',
		'                      ]',
		'                    }',
		'                  ]',
		'                },',
		'                "%"',
		'              ]',
		'            }',
		'          ]',
		'        }',
		'      ]',
		'    }',
		'  }',
		'}'
	].join('\n');
};


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
	},
	onWizardRender: (updateEditorString:(editorString:string) => void): JSX.Element => {
		return (
			<WizardDataBars
			 emptyBarValue={0}
			 fullBarValue={20}
			 updateValues={(emptyBarValue:number, fullBarValue:number, valueDisplay:string) => {
				updateEditorString(calculateCode(emptyBarValue, fullBarValue, valueDisplay));
			 }}/>
		);
	}
};