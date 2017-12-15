import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, uiState } from '../state/State';
import { ColumnFormatterEditor } from './ColumnFormatterEditor';
import { ColumnFormatterWelcome } from './ColumnFormatterWelcome';

export interface IColumnFormatterProps {
  uistate?: uiState;
}

class ColumnFormatter_ extends React.Component<IColumnFormatterProps, {}> {
  public render(): React.ReactElement<IColumnFormatterProps> {
    return (
      <div className={styles.columnFormatter}>
        {this.props.uistate == uiState.welcome && (
          <ColumnFormatterWelcome/>
        )}
        {this.props.uistate == uiState.editing && (
          <ColumnFormatterEditor/>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterProps{
	return {
    uistate: state.ui.state
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterProps>): IColumnFormatterProps{
	return {

	};
}

export const ColumnFormatter = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatter_);