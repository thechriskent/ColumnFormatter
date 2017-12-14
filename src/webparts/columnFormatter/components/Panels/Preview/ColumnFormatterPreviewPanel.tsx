import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { PreviewView } from './PreviewView';
import { PreviewHeader } from './PreviewHeader';

export interface IColumnFormatterPreviewPanelProps {
}  

export class ColumnFormatterPreviewPanel extends React.Component<IColumnFormatterPreviewPanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPreviewPanelProps> {
		return (
		  <div className={styles.panel}>
				<PreviewHeader/>
				<PreviewView/>
		  </div>
		);
	}
}