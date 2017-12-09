import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface IDataColumnHeaderProps {
	name: string;
	onNameChanged: (newValue:string) => void;
}

export class DataColumnHeader extends React.Component<IDataColumnHeaderProps, {}> {
	public render(): React.ReactElement<IDataColumnHeaderProps> {
		return (
			<TextField
			 value={this.props.name}
			 onChanged={this.props.onNameChanged}/>
		);
	}
}