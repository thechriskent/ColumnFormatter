import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { IData, IApplicationState, IColumn, columnTypes } from '../../../state/State';

export interface IPreviewViewProps {
	columns: Array<IColumn>;
	rows: Array<Array<any>>;
}

class PreviewView_ extends React.Component<IPreviewViewProps, {}> {
	public render(): React.ReactElement<IPreviewViewProps> {
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
											{this.previewElement(value,rIndex,cIndex)}
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

	private previewElement(value:any, rIndex:number, cIndex:number): JSX.Element {
		switch (this.props.columns[cIndex].type) {
			case columnTypes.boolean:
				return (<span>{value ? "Yes" : "No"}</span>);
			case columnTypes.lookup:
				return (<span>{value.lookupValue}</span>);
			case columnTypes.link:
				return (<span>{value.URL}</span>);
			default:
				return (<span>{value}</span>);
		}
	}
}

function mapStateToProps(state: IApplicationState): IPreviewViewProps{
	return {
		columns: state.data.columns,
		rows: state.data.rows
	};
}

export const PreviewView = connect(mapStateToProps, null)(PreviewView_);