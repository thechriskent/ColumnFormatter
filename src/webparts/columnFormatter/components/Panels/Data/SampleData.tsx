import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IData, IApplicationState } from '../../../state/State';
import { updateDataRow } from '../../../state/Actions';
import { SampleText } from './SampleValues/SampleText';
//import { IApplicationState } from '../../../../../../lib/webparts/columnFormatter/state/State';

export interface ISampleDataProps {
	data?: IData;
	update?: (rowIndex:number, colIndex:number, value:any) => void;
}

class SampleData_ extends React.Component<ISampleDataProps, {}> {
	public render(): React.ReactElement<ISampleDataProps> {
		/*let data = {
			columns: [
				{
					name:'currentField',
					type: 'person' //eventually an enum
				}
			],
			rows: [
				["Bugs Bunny", 4],
				["Porky Pig", 2],
				["Daffy Duck", 16]
			]
		};*/
		return (
		  <div>
				<table>
					<tbody>
					{this.props.data.rows.map((row:Array<any>, rIndex:number) => {
						return (
							<tr key={rIndex}>
								{row.map((value:any, cIndex:number) =>{
									return (
										<td key={cIndex}>
											<SampleText value={value} onChanged={(newValue:any)=>{this.props.update(rIndex,cIndex,newValue);}}/>
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