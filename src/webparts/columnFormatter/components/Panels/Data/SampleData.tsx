import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { SampleText } from './SampleValues/SampleText';

export interface ISampleDataProps {
}

export class SampleData extends React.Component<ISampleDataProps, {}> {
	public render(): React.ReactElement<ISampleDataProps> {
		let data = {
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
		};
		return (
		  <div>
				<table>
					<tbody>
					{data.rows.map((row:Array<any>, index:number) => {
						return (
							<tr key={index}>
								{row.map((value:any, index:number) =>{
									return (
										<td key={index}>
											<SampleText value={value} onChanged={(newValue:any)=>{console.log(newValue);}}/>
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