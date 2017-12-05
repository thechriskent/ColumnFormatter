import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import IColumnFormatterTreePanelProps from './IColumnFormatterTreePanelProps';

export class ColumnFormatterTreePanel extends React.Component<IColumnFormatterTreePanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterTreePanelProps> {
		return (
		  <div className={styles.panel}>
			Tree Panel
		  </div>
		);
	}
}