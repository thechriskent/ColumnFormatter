import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
	IData, IApplicationState, IColumn, columnTypes,
	ILookupFieldValue, ILinkFieldValue, IPersonFieldValue
} from '../../../state/State';
import { updateDataRow, updateDataColumnName } from '../../../state/Actions';
import { DataColumnHeader } from './DataColumnHeader';
import { SampleText } from './SampleValues/SampleText';
import { SampleBoolean } from './SampleValues/SampleBoolean';
import { SampleLookup } from './SampleValues/SampleLookup';
import { SampleLink } from './SampleValues/SampleLink';
import { SampleNumber } from './SampleValues/SampleNumber';
import { SamplePerson } from './SampleValues/SamplePerson';

export interface ISampleDataProps {
	data?: IData;
	updateRow?: (rowIndex:number, colIndex:number, value:any) => void;
	updateColumnName?: (colIndex:number, name:string) => void;
}

class SampleData_ extends React.Component<ISampleDataProps, {}> {
	public render(): React.ReactElement<ISampleDataProps> {
		return (
		  <div>
				<table className={styles.dataTable} cellPadding={0} cellSpacing={0}>
					<thead>
						<tr>
							{this.props.data.columns.map((column:IColumn, index:number) => {
								return (
									<td key={index}>
										{index == 0 && (<span>{column.name}</span>)}
										{index > 0 && (
											<DataColumnHeader
											 name={column.name}
											 onNameChanged={(newValue:string): void => {this.props.updateColumnName(index,newValue);}}/>
										)}
									</td>
								);
							})}
						</tr>
					</thead>
					<tbody>
					{this.props.data.rows.map((row:Array<any>, rIndex:number) => {
						return (
							<tr key={rIndex}>
								{row.map((value:any, cIndex:number) =>{
									return (
										<td key={cIndex}>
											{this.sampleElement(value, rIndex, cIndex)}
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

	private sampleElement(value:any, rIndex:number, cIndex:number): JSX.Element {
		switch (this.props.data.columns[cIndex].type) {
			case columnTypes.boolean:
				return (<SampleBoolean value={value} onChanged={(newValue:any) => {this.props.updateRow(rIndex, cIndex, newValue);}}/> );
			case columnTypes.lookup:
				return (<SampleLookup value={value} onChanged={(newValue:ILookupFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.link:
				return (<SampleLink value={value} onChanged={(newValue:ILinkFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.number:
				return (<SampleNumber value={value} onChanged={(newValue:number) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.person:
				return (<SamplePerson value={value} onChanged={(newValue:IPersonFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			default:
				return (<SampleText value={value} onChanged={(newValue:string) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
		}
	}
}

function mapStateToProps(state: IApplicationState): ISampleDataProps{
	return {
		data: state.data
	};
}

function mapDispatchToProps(dispatch: Dispatch<ISampleDataProps>): ISampleDataProps{
	return {
		updateRow: (rowIndex:number, colIndex:number, value: any) => {
			dispatch(updateDataRow(rowIndex, colIndex, value));
		},
		updateColumnName: (colIndex:number, name:string) => {
			dispatch(updateDataColumnName(colIndex, name));
		}
	};
}

export const SampleData = connect(mapStateToProps, mapDispatchToProps)(SampleData_);