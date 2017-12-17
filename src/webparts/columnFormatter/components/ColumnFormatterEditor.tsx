import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { resizePane } from '../state/Actions';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState } from '../state/State';
var SplitPane = require('react-split-pane');
import { ColumnFormatterEditorCommands } from './ColumnFormatterEditorCommands';
import { ColumnFormatterPropertyPane } from './Panes/ColumnFormatterPropertyPane';
import { ColumnFormatterViewPane } from './Panes/ColumnFormatterViewPane';

export interface IColumnFormatterEditorProps {
  paneResized?: (size:number) => void;
}

class ColumnFormatterEditor_ extends React.Component<IColumnFormatterEditorProps, {}> {
  public render(): React.ReactElement<IColumnFormatterEditorProps> {
    return (
      <div>
        <ColumnFormatterEditorCommands/>
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

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterEditorProps>): IColumnFormatterEditorProps{
	return {
		paneResized: (size:number) => {
			dispatch(resizePane('main', size));
    }
	};
}

export const ColumnFormatterEditor = connect(null, mapDispatchToProps)(ColumnFormatterEditor_);