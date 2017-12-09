import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
//import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.Props';
var SplitPane = require('react-split-pane');

import ColumnFormatterPropertyPane from './Panes/ColumnFormatterPropertyPane';
import ColumnFormatterViewPane from './Panes/ColumnFormatterViewPane';

export interface IColumnFormatterProps {
  description: string;
}

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
              key: 'undo',
              name: 'Undo',
              iconProps: {iconName: 'Undo'}
            },
            {
              key: 'redo',
              name: 'Redo',
              iconProps: {iconName: 'Redo'}
            },
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
          minSize={185}
          maxSize={-204}>
            <ColumnFormatterPropertyPane/>
            <ColumnFormatterViewPane/>
          </SplitPane>
        </div>
      </div>
    );
  }
}
