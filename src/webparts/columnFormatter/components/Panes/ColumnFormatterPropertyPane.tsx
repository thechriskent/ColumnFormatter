import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ColumnFormatterTreePanel } from '../Panels/Tree/ColumnFormatterTreePanel';
import { ColumnFormatterDataPanel } from '../Panels/Data/ColumnFormatterDataPanel';

export interface IColumnFormatterPropertyPaneProps {
}

export default class ColumnFormatterPropertyPane extends React.Component<IColumnFormatterPropertyPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPropertyPaneProps> {
		return (
		  <Tabs>
			<TabPanel>
				<ColumnFormatterDataPanel/>
			</TabPanel>
			<TabPanel>
				Wowee!
			</TabPanel>
			<TabPanel>
				<ColumnFormatterTreePanel/>
			</TabPanel>
			<TabList>
				<Tab><Icon iconName='TextField'/><span>{strings.TabData}</span></Tab>
				<Tab><Icon iconName='LightningBolt'/><span>{strings.TabWizard}</span></Tab>
				<Tab><Icon iconName='Bookmarks'/><span>{strings.TabTree}</span></Tab>
			</TabList>
		  </Tabs>
		);
	  }
}