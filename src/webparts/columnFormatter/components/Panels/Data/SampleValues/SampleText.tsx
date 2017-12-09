import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface ISampleTextProps {
	value: string;
	onChanged: (newValue:string) => void;
}

export class SampleText extends React.Component<ISampleTextProps, {}> {
	public render(): React.ReactElement<ISampleTextProps> {
		return (
		  <div>
				<TextField value={this.props.value} onChanged={this.props.onChanged}/>
		  </div>
		);
	}
}