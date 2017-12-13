import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { resizePane } from '../state/Actions';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
var SplitPane = require('react-split-pane');

import ColumnFormatterPropertyPane from './Panes/ColumnFormatterPropertyPane';
import { ColumnFormatterViewPane } from './Panes/ColumnFormatterViewPane';

export interface IColumnFormatterProps {
  paneResized?: (size:number) => void;
}

class ColumnFormatter_ extends React.Component<IColumnFormatterProps, {}> {
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
          maxSize={-204}
          onDragFinished={(size:number) => {this.props.paneResized(size);}}>
            <ColumnFormatterPropertyPane/>
            <ColumnFormatterViewPane/>
          </SplitPane>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterProps>): IColumnFormatterProps{
	return {
		paneResized: (size:number) => {
			dispatch(resizePane('main', size));
		}
	};
}

export const ColumnFormatter = connect(null, mapDispatchToProps)(ColumnFormatter_);