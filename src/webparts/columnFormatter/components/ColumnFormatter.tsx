import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { IColumnFormatterProps } from './IColumnFormatterProps';
import { escape } from '@microsoft/sp-lodash-subset';
var SplitPane = require('react-split-pane');

import ColumnFormatterPropertyPane from './Panes/PropertyPane/ColumnFormatterPropertyPane';
import ColumnFormatterViewPane from './Panes/ViewPane/ColumnFormatterViewPane';

export default class ColumnFormatter extends React.Component<IColumnFormatterProps, {}> {
  public render(): React.ReactElement<IColumnFormatterProps> {
    return (
      <div className={styles.columnFormatter}>
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
    );
  }
}
