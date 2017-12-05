import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import IColumnFormatterPropertyPaneProps from './IColumnFormatterPropertyPaneProps';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ColumnFormatterTreePanel } from '../../Panels/Tree/ColumnFormatterTreePanel';
import { ColumnFormatterDataPanel } from '../../Panels/Data/ColumnFormatterDataPanel';

export default class ColumnFormatterPropertyPane extends React.Component<IColumnFormatterPropertyPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPropertyPaneProps> {
		return (
		  <Tabs>
			<TabPanel>
				Wowee!
			</TabPanel>
			<TabPanel>
				<ColumnFormatterTreePanel/>
			</TabPanel>
			<TabPanel>
				<ColumnFormatterDataPanel/>
			</TabPanel>
			<TabList>
				<Tab><Icon iconName='LightningBolt'/><span>Wizard</span></Tab>
				<Tab><Icon iconName='Bookmarks'/><span>Tree View</span></Tab>
				<Tab><Icon iconName='TextField'/><span>Data</span></Tab>
			</TabList>
		  </Tabs>
		);
	  }
}