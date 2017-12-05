import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import IColumnFormatterDataPanelProps from './IColumnFormatterDataPanelProps';

export class ColumnFormatterDataPanel extends React.Component<IColumnFormatterDataPanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterDataPanelProps> {
		return (
		  <div className={styles.panel}>
			Data Panel
		  </div>
		);
	}
}