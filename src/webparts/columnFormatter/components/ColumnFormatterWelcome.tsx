import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, columnTypes } from '../state/State';
import { iconForType, textForType } from '../helpers/ColumnTypeHelpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export enum welcomeStage {
  start,
  new,
  open
}

export interface IColumnFormatterWelcomeProps {
}

export interface IColumnFormatterWelcomeState {
  stage: welcomeStage;
  columnType: columnTypes;
}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, IColumnFormatterWelcomeState> {

  constructor(props:IColumnFormatterWelcomeProps) {
    super(props);

    this.state = {
      stage: welcomeStage.new,
      columnType: columnTypes.text
    };
  }

  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {
    return (
      <div className={styles.welcome}>
        <div className={styles.welcomeBox}>
          {this.state.stage == welcomeStage.start && (
            <div>
              <div className={styles.header}>
                <h1>Column Formatter</h1>
                <span>Easy editor for modern listview Column Formatting</span>
              </div>
              <div className={styles.startButtons}>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.new);}}>
                  <div className={styles.icon}>
                    <Icon iconName='Filters'/>
                  </div>
                  <div className={styles.words}>
                    <h2>New</h2>
                    <span>Start with a blank canvas or choose from a template</span>
                  </div>
                </div>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.open);}}>
                  <div className={styles.icon}>
                    <Icon iconName='OpenFolderHorizontal'/>
                  </div>
                  <div className={styles.words}>
                    <h2>Open</h2>
                    <span>Load from a library or pull from a local list</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.new && (
            <div className={styles.newForm}>
              <div className={styles.columnType}>
                <Label required={true}>Column Type</Label>
                <Dropdown
                 selectedKey={this.state.columnType}
                 onChanged={this.onChangeColumnType}
                 options={[
                   {key: columnTypes.choice, text: textForType(columnTypes.choice)},
                   {key: columnTypes.datetime, text: textForType(columnTypes.datetime)},
                   {key: columnTypes.link, text: textForType(columnTypes.link)},
                   {key: columnTypes.lookup, text: textForType(columnTypes.lookup)},
                   {key: columnTypes.number, text: textForType(columnTypes.number)},
                   {key: columnTypes.person, text: textForType(columnTypes.person)},
                   {key: columnTypes.picture, text: textForType(columnTypes.picture)},
                   {key: columnTypes.text, text: textForType(columnTypes.text)},
                   {key: columnTypes.boolean, text: textForType(columnTypes.boolean)}
                 ]}/>
              </div>
              <ChoiceGroup
               options={[
                 {key:'wizard', text:'Start with a template', onRenderField: (props, render) => {
                  return(
                    <div>
                      { render!(props) }
                      <ChoiceGroup
                       options={[
                        {key:'someWizard', text:'Some Wizard', iconProps:{iconName:'Color'}},
                        {key:'otherWizard', text:'Other Wizard', iconProps:{iconName:'ColorSolid'}}
                       ]}/>
                    </div>
                  );
                 }},
                 {key:'blank', text:'Start from scratch'}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text="Back" onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text="OK"/>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.open && (
            <div>Open!</div>
          )}
        </div>
      </div>
    );
  }

  @autobind
  private gotoStage(stage:welcomeStage): void {
    this.setState({
      stage
    });
  }

  @autobind
  private onChangeColumnType(item: IDropdownOption): void {
    this.setState({
      columnType: +item.key
    });
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