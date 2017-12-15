import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState } from '../state/State';


export interface IColumnFormatterWelcomeProps {

}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, {}> {
  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {
    return (
      <div className={styles.welcome}>
        Welcome!
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterWelcomeProps{
	return {

	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterWelcomeProps>): IColumnFormatterWelcomeProps{
	return {

	};
}

export const ColumnFormatterWelcome = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWelcome_);