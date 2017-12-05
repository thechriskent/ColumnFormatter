import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { IColumnFormatterProps } from './IColumnFormatterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
var SplitPane = require('react-split-pane');

import ColumnFormatterPropertyPane from './Panes/PropertyPane/ColumnFormatterPropertyPane';
import ColumnFormatterViewPane from './Panes/ViewPane/ColumnFormatterViewPane';

export default class ColumnFormatter extends React.Component<IColumnFormatterProps, {}> {
  public render(): React.ReactElement<IColumnFormatterProps> {
    return (
      <div className={styles.columnFormatter}>
        <CommandBar
          items={[
            {
              key: 'new',
              name: 'New',
              iconProps: {iconName: 'Add'}
            },
            {
              key: 'customize',
              name: 'Customize',
              iconProps: {iconName: 'Fingerprint'},
            }
          ]}
          farItems={[
            {
              key: 'copy',
              name: 'Copy',
              iconProps: {iconName: 'Copy'}
            }
          ]}
        />
        <div className={styles.app}>
          <SplitPane
          split="vertical"
          className={styles.SplitPane}
          size={185}
          minSize={100}
          maxSize={-200}>
            <ColumnFormatterPropertyPane/>
            <ColumnFormatterViewPane/>
          </SplitPane>
        </div>
      </div>
    );
  }
}
