import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { IData, IApplicationState } from '../../../state/State';

export interface IPreviewViewProps {
	rows: Array<Array<any>>;
}

class PreviewView_ extends React.Component<IPreviewViewProps, {}> {
	public render(): React.ReactElement<IPreviewViewProps> {
		return (
		  <div>
				<table>
					<tbody>
					{this.props.rows.map((row:Array<any>, rIndex:number) => {
						return (
							<tr key={rIndex}>
								{row.map((value:any, cIndex:number) =>{
									return (
										<td key={cIndex}>
											{value}
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

function mapStateToProps(state: IApplicationState): IPreviewViewProps{
	return {
		rows: state.data.rows
	};
}

export const PreviewView = connect(mapStateToProps, null)(PreviewView_);