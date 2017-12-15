import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IData, IApplicationState, IColumn, columnTypes } from '../../../state/State';
//var CustomFormatter = require('../../../../../CustomFormatter/customformatter-MSFT');
import { LocalCustomFormatter, LocalHtmlEncoding } from '../../../../../CustomFormatter/LocalCustomFormatter';
import { LocalCustomFormatterStrings, IFormatterFieldInfo } from '../../../../../CustomFormatter/LocalFieldRendererFormat';
import * as tslib from 'tslib';
import { updateFormatterErrors } from '../../../state/Actions';

export interface IPreviewViewProps {
	columns?: Array<IColumn>;
	rows?: Array<Array<any>>;
	formatterString?: string;
	updateFormatterErrors?: (formatterErrors:Array<string>) => void;
}

interface IHTMLmarkupObject {
	__html: string;
}

class PreviewView_ extends React.Component<IPreviewViewProps, {}> {

	private _cfContainer: any = {};
	private _heContainer: any = {};

	private _formatterErrors: Array<string>;

	constructor(props:IPreviewViewProps){
		super(props);

		//Build the HTMLEncoding Object
		LocalHtmlEncoding(null,this._heContainer);
		//Build the CustomFormatter Object
		LocalCustomFormatter(null,this._cfContainer,tslib,LocalCustomFormatterStrings,null,this._heContainer,null);
	}

	public render(): React.ReactElement<IPreviewViewProps> {
		this._formatterErrors = new Array<string>();

		return (
		  <div>
				<table>
					<thead>
						<tr>
							{this.props.columns.map((column:IColumn, index:number) => {
								return (
									<td key={index}>
										{column.name}
									</td>
								);
							})}
						</tr>
					</thead>
					<tbody>
					{this.props.rows.map((row:Array<any>, rIndex:number) => {
						return (
							<tr key={rIndex}>
								{row.map((value:any, cIndex:number) =>{
									return (
										<td key={cIndex}>
											{cIndex == 0 && (
												<div
												 className='od-FieldRenderer-customFormatter'
												 dangerouslySetInnerHTML={this.formattedMarkup(rIndex)}/>
											)}
											{cIndex > 0 && this.previewElement(value,rIndex,cIndex)}
										</td>
									);
								})}
							</tr>
						);
					})}
					</tbody>
				</table>
		  </div>
		);
	}

	public componentDidMount(): void {
		this.evaluateFormatterErrors();
	}

	public componentDidUpdate(): void {
		this.evaluateFormatterErrors();
	}

	private evaluateFormatterErrors(): void {
		this.props.updateFormatterErrors(this._formatterErrors);
	}

	private formattedMarkup(rIndex:number): IHTMLmarkupObject {
		let formatterFieldInfo: IFormatterFieldInfo = this.getFormatterFieldInfo(rIndex);
		let formatter = new this._cfContainer.CustomFormatter(formatterFieldInfo);
		let htmlString:string = formatter.evaluate();
		let errorString:string = formatter.errors();
		if(errorString.length) {
			this._formatterErrors.push('Row ' + rIndex.toString() + ': ' + errorString);
		}
		return {
			__html: formatter.evaluate()
		};
	}

	private previewElement(value:any, rIndex:number, cIndex:number): JSX.Element | string {
		//Standard Display for other fields
		let translatedValue: string;
		switch (this.props.columns[cIndex].type) {
			case columnTypes.boolean:
				translatedValue = value ? "Yes" : "No";
				break;
			case columnTypes.lookup:
				translatedValue = value.lookupValue;
				break;
			case columnTypes.link:
			case columnTypes.picture:
				translatedValue = value.URL;
				break;
			case columnTypes.person:
				translatedValue = value.title;
				break;
			case columnTypes.datetime:
				translatedValue = value.toLocaleString();
				break;
			default:
				translatedValue = value;
				break;
		}
		return (<span>{translatedValue}</span>);
	}

	private getFormatterFieldInfo(rIndex:number): IFormatterFieldInfo {
		//Apply Formatting
		let row = {
			ID: rIndex
		};
		let rowSchema = {};
		for(var i = 0; i < this.props.columns.length; i++) {
			let colType: string;
			switch (this.props.columns[i].type) {
				case columnTypes.boolean:
					colType = "Boolean";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i] ? "Yes" : "No";
					row[this.props.columns[i].name + '.value'] = this.props.rows[rIndex][i] ? "1" : "0";
					break;
				case columnTypes.choice:
					colType = "Choice";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
					break;
				case columnTypes.datetime:
					colType = "DateTime";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toLocaleDateString();
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i].toISOString();
					break;
				case columnTypes.link:
					colType = "Hyperlink";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				case columnTypes.lookup:
					colType = "Lookup";
					row[this.props.columns[i].name] = [{
						...this.props.rows[rIndex][i],
						isSecretFieldValue: false
					}];
					break;
				case columnTypes.number:
					colType = "Number";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toPrecision(14);
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i];
					break;
				case columnTypes.person:
					colType = "User";
					row[this.props.columns[i].name] = [this.props.rows[rIndex][i]];
					break;
				case columnTypes.picture:
					colType = "Image";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				default:
					colType = "Text";
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
			}
			rowSchema[this.props.columns[i].name] = colType;
		}
		
		return {
			currentFieldName: "currentField",
			//fieldRendererFormat: '{"$schema": "https://gist.githubusercontent.com/thechriskent/2e09be14a4b491cfae256220cfca6310/raw/eb9f675bf523208eb840c462d4f716fa92ce14c2/columnFormattingSchema.json","elmType": "div","txtContent": {"operator": "+","operands": ["@currentField","!"]}}',
			fieldRendererFormat: this.props.formatterString,
			pageContextInfo: null,
			row: row,
			rowSchema: rowSchema
		};
	}
}

function mapStateToProps(state: IApplicationState): IPreviewViewProps{
	return {
		columns: state.data.columns,
		rows: state.data.rows,
		formatterString: state.code.formatterString
	};
}

function mapDispatchToProps(dispatch: Dispatch<IPreviewViewProps>): IPreviewViewProps{
	return {
		updateFormatterErrors: (formatterErrors:Array<string>) => {
			dispatch(updateFormatterErrors(formatterErrors));
		}
    };
}

export const PreviewView = connect(mapStateToProps, mapDispatchToProps)(PreviewView_);