import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import IColumnFormatterPreviewPanelProps from './IColumnFormatterPreviewPanelProps';

export default class ColumnFormatterPreviewPanel extends React.Component<IColumnFormatterPreviewPanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPreviewPanelProps> {
		return (
		  <div className={styles.panel}>
			Preview Panel
		  </div>
		);
	}
}