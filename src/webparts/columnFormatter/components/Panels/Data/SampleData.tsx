import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IData, IApplicationState, IColumn, columnTypes, ILookupFieldValue } from '../../../state/State';
import { updateDataRow } from '../../../state/Actions';
import { SampleText } from './SampleValues/SampleText';
import { SampleBoolean } from './SampleValues/SampleBoolean';
import { SampleLookup } from './SampleValues/SampleLookup';

export interface ISampleDataProps {
	data?: IData;
	update?: (rowIndex:number, colIndex:number, value:any) => void;
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
										{column.name}
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
				return (<SampleBoolean value={value} onChanged={(newValue:any) => {this.props.update(rIndex, cIndex, newValue);}}/> );
			case columnTypes.lookup:
				return (<SampleLookup value={value} onChanged={(newValue:ILookupFieldValue) => {this.props.update(rIndex, cIndex, newValue);}}/>);
			default:
				return (<SampleText value={value} onChanged={(newValue:any) => {this.props.update(rIndex, cIndex, newValue);}}/>);
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
		update: (rowIndex:number, colIndex:number, value: any) => {
			dispatch(updateDataRow(rowIndex, colIndex, value));
		}
	};
}

export const SampleData = connect(mapStateToProps, mapDispatchToProps)(SampleData_);