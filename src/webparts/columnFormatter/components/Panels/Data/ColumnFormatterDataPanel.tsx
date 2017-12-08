import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { SampleData } from './SampleData';

export interface IColumnFormatterDataPanelProps {
}

export class ColumnFormatterDataPanel extends React.Component<IColumnFormatterDataPanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterDataPanelProps> {
		return (
		  <div className={styles.panel}>
				<span className={styles.panelHeader}>Sample Data</span>
				<SampleData/>
		  </div>
		);
	}
}