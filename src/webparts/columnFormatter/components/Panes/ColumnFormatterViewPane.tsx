import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import { IColumnFormatterViewPaneProps } from './IColumnFormatterViewPaneProps';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class ColumnFormatterViewPane extends React.Component<IColumnFormatterViewPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterViewPaneProps> {
		return (
		  <Tabs>
			<TabPanel>
				Preview
			</TabPanel>
			<TabPanel>
				Code
			</TabPanel>
			<TabList style={{"text-align":"right"}}>
				<Tab><Icon iconName='RedEye'/><span>Preview</span></Tab>
				<Tab><Icon iconName='Embed'/><span>Code</span></Tab>
			</TabList>
		  </Tabs>
		);
	  }
}