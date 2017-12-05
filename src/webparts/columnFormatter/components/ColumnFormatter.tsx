import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { IColumnFormatterProps } from './IColumnFormatterProps';
import { escape } from '@microsoft/sp-lodash-subset';
var SplitPane = require('react-split-pane');

export default class ColumnFormatter extends React.Component<IColumnFormatterProps, {}> {
  public render(): React.ReactElement<IColumnFormatterProps> {
    return (
      <div className={styles.columnFormatter}>
        <SplitPane
         split="vertical"
         className={styles.SplitPane}
         resizerClassName={styles.Resizer}
         size="30%"
         minSize={100}>
          <div>dog</div>
          <div>cat</div>
        </SplitPane>
      </div>
    );
  }
}
