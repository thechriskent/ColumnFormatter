import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface ISampleBooleanProps {
	value: boolean;
	onChanged: (newValue:any) => void;
}

export class SampleBoolean extends React.Component<ISampleBooleanProps, {}> {
	public render(): React.ReactElement<ISampleBooleanProps> {
		return (
		  <div>
				<Toggle
				 defaultChecked={this.props.value}
				 onText="Yes"
				 offText="No"
				 onChanged={this.props.onChanged}/>
		  </div>
		);
	}
}