import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ColumnFormatterPreviewPanel } from '../Panels/Preview/ColumnFormatterPreviewPanel';
import { ColumnFormatterCodePanel } from '../Panels/Code/ColumnFormatterCodePanel';
var SplitPane = require('react-split-pane');

export interface IColumnFormatterViewPaneProps {
}

export default class ColumnFormatterViewPane extends React.Component<IColumnFormatterViewPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterViewPaneProps> {
		return (
		  <Tabs>
			<TabPanel>
				<ColumnFormatterPreviewPanel/>
			</TabPanel>
			<TabPanel>
				<ColumnFormatterCodePanel/>
			</TabPanel>
			<TabPanel>
				<SplitPane
         split="vertical"
         className={styles.SplitPaneInTab}
         size="50%"
         minSize={100}
				 maxSize={-100}>
          <ColumnFormatterPreviewPanel/>
          <ColumnFormatterCodePanel/>
        </SplitPane>
			</TabPanel>
			<TabList style={{"textAlign":"right"}}>
				<Tab><Icon iconName='RedEye'/><span>Preview</span></Tab>
				<Tab><Icon iconName='Embed'/><span>Code</span></Tab>
				<Tab><Icon iconName='DoubleColumn'/><span>Side by Side</span></Tab>
			</TabList>
		  </Tabs>
		);
	  }
}