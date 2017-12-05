import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import { IColumnFormatterPropertyPaneProps } from './IColumnFormatterPropertyPaneProps';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class ColumnFormatterPropertyPane extends React.Component<IColumnFormatterPropertyPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPropertyPaneProps> {
		return (
		  <Tabs>
			<TabPanel>
				Wowee!
			</TabPanel>
			<TabPanel>
				Terrific!
			</TabPanel>
			<TabPanel>
				Delicious!
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