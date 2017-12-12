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
}

function mapStateToProps(state: IApplicationState): IPreviewViewProps{
	return {
		columns: state.data.columns,
		rows: state.data.rows
	};
}

export const PreviewView = connect(mapStateToProps, null)(PreviewView_);