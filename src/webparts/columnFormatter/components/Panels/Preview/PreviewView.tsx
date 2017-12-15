import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IData, IApplicationState, IDataColumn, columnTypes } from '../../../state/State';
//var CustomFormatter = require('../../../../../CustomFormatter/customformatter-MSFT');
import { LocalCustomFormatter, LocalHtmlEncoding } from '../../../../../CustomFormatter/LocalCustomFormatter';
import { LocalCustomFormatterStrings, IFormatterFieldInfo } from '../../../../../CustomFormatter/LocalFieldRendererFormat';
import * as tslib from 'tslib';
import { updateFormatterErrors } from '../../../state/Actions';
import {
	DetailsList,
	DetailsListLayoutMode,
	Selection,
	IColumn
  } from 'office-ui-fabric-react/lib/DetailsList';

export interface IPreviewViewProps {
	columns?: Array<IDataColumn>;
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
			<DetailsList
			 items={this.buildItems()}
			 columns={this.buildColumns()}/>
		);

		/*return (
		  <div>
				<table>
					<thead>
						<tr>
							{this.props.columns.map((column:IDataColumn, index:number) => {
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
											{cIndex == 0 && this.formattedMarkup(rIndex)}
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
		);*/
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

	private buildItems(): Array<any> {
		let items:Array<any> = new Array<any>();
		for(var r = 0; r<this.props.rows.length; r++) {
			let item:any = {};
			for(var c = 0; c<this.props.columns.length; c++) {
				item[this.props.columns[c].name] = this.props.rows[r][c];
			}
			items.push(item);
		}
		return items;
	}

	private buildColumns(): Array<IColumn> {
		let columns:Array<IColumn> = new Array<IColumn>();
		columns.push({
			key: 'currentField',
			name: 'currentField',
			fieldName: 'currentField',
			minWidth: 130,
			maxWidth: 130,
			className: 'od-DetailsRow-cell--' + this.colTypeFromEnum(this.props.columns[0].type),
			onRender: (item?: any, index?: number) => {
				return this.formattedMarkup(index);
			}
		});
		for(var c = 1; c<this.props.columns.length; c++) {
			let cIndex:number = c;
			columns.push({
				key: this.props.columns[c].name,
				name: this.props.columns[c].name,
				fieldName: this.props.columns[c].name,
				minWidth: 130,
				maxWidth: 130,
				className: 'od-DetailsRow-cell--' + this.colTypeFromEnum(this.props.columns[c].type),
				onRender: (item:any, index:number) => {
					return this.previewElement(this.props.rows[index][cIndex], index, cIndex);
				}
			});
		}
		return columns;
	}

	private formattedMarkup(rIndex:number): JSX.Element {
		let formatterFieldInfo: IFormatterFieldInfo = this.getFormatterFieldInfo(rIndex);
		let formatter = new this._cfContainer.CustomFormatter(formatterFieldInfo);
		let htmlString:string = formatter.evaluate();
		let errorString:string = formatter.errors();
		if(errorString.length) {
			this._formatterErrors.push('Row ' + rIndex.toString() + ': ' + errorString);
		}
		let innerHtml:IHTMLmarkupObject = {
			__html: htmlString
		};
		return (
			<div
			 className='od-FieldRenderer-customFormatter'
			 dangerouslySetInnerHTML={innerHtml}/>
		);
	}

	private previewElement(value:any, rIndex:number, cIndex:number): JSX.Element {
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
			switch (this.props.columns[i].type) {
				case columnTypes.boolean:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i] ? "Yes" : "No";
					row[this.props.columns[i].name + '.value'] = this.props.rows[rIndex][i] ? "1" : "0";
					break;
				case columnTypes.choice:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
					break;
				case columnTypes.datetime:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toLocaleDateString();
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i].toISOString();
					break;
				case columnTypes.link:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				case columnTypes.lookup:
					row[this.props.columns[i].name] = [{
						...this.props.rows[rIndex][i],
						isSecretFieldValue: false
					}];
					break;
				case columnTypes.number:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toPrecision(14);
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i];
					break;
				case columnTypes.person:
					row[this.props.columns[i].name] = [this.props.rows[rIndex][i]];
					break;
				case columnTypes.picture:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				default:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
			}
			rowSchema[this.props.columns[i].name] = this.colTypeFromEnum(this.props.columns[i].type);
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

	private colTypeFromEnum(enumValue:columnTypes): string {
		switch (enumValue) {
			case columnTypes.boolean:
				return "Boolean";
			case columnTypes.choice:
				return "Choice";
			case columnTypes.datetime:
				return "DateTime";
			case columnTypes.link:
				return "Hyperlink";
			case columnTypes.lookup:
				return "Lookup";
			case columnTypes.number:
				return "Number";
			case columnTypes.person:
				return "User";
			case columnTypes.picture:
				return "Image";
			default:
				return "Text";
		}
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