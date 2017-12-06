import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';

export interface IColumnFormatterCodePanelProps {
}

export class ColumnFormatterCodePanel extends React.Component<IColumnFormatterCodePanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterCodePanelProps> {
		return (
		  <div className={styles.panel}>
			CodePanel
		  </div>
		);
	}
}