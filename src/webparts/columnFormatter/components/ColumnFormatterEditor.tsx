import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { resizePane } from '../state/Actions';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { chooseTheme, changeUIState } from '../state/Actions';
import { IApplicationState, editorThemes, uiState } from '../state/State';
var SplitPane = require('react-split-pane');

import { ColumnFormatterPropertyPane } from './Panes/ColumnFormatterPropertyPane';
import { ColumnFormatterViewPane } from './Panes/ColumnFormatterViewPane';

export interface IColumnFormatterEditorProps {
  changeUIState?: (state:uiState) => void;
  theme?: editorThemes;
  paneResized?: (size:number) => void;
  chooseTheme?: (theme:editorThemes) => void;
}

export interface IColumnFormatterEditorState {
  confirmationDialogVisible: boolean;
}

class ColumnFormatterEditor_ extends React.Component<IColumnFormatterEditorProps, IColumnFormatterEditorState> {

  public constructor(props:IColumnFormatterEditorProps) {
    super(props);

    this.state = {
      confirmationDialogVisible: false
    };
  }

  public render(): React.ReactElement<IColumnFormatterEditorProps> {
    return (
      <div>
        <CommandBar
          items={[
            {
              key: 'new',
              name: strings.CommandNew,
              iconProps: {iconName: 'Add'},
              onClick: this.onNewClick
            },
            {
              key: 'customize',
              name: strings.CommandCustomize,
              iconProps: {iconName: 'Fingerprint'},
            }
          ]}
          farItems={[
            {
              key: 'theme',
              name: strings.CommandEditor,
              iconProps: {iconName: 'Color'},
              subMenuProps: {
                items: [
                  {
                    key: 'vs',
                    name: 'vs',
                    canCheck: true,
                    checked: this.props.theme == editorThemes.vs,
                    onClick: this.onChooseTheme
                  },
                  {
                    key: 'vsDark',
                    name: 'vs-dark',
                    canCheck: true,
                    checked: this.props.theme == editorThemes.vsDark,
                    onClick: this.onChooseTheme
                  },
                  {
                    key: 'hcBlack',
                    name: 'hc-black',
                    canCheck: true,
                    checked: this.props.theme == editorThemes.hcBlack,
                    onClick: this.onChooseTheme
                  }
                ]
              }
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
        <Dialog
         hidden={!this.state.confirmationDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.normal,
           title: strings.NewConfirmationDialogTitle,
           subText: strings.NewConfirmationDialogText
         }}>
         <DialogFooter>
           <PrimaryButton text={strings.NewConfirmationDialogConfirmButton} onClick={() => {this.props.changeUIState(uiState.welcome);}}/>
           <DefaultButton text={strings.NewConfirmationDialogCancelButton} onClick={this.closeDialog}/>
         </DialogFooter>
        </Dialog>
      </div>
    );
  }

  @autobind
  private onNewClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.setState({
      confirmationDialogVisible: true
    });
  }

  @autobind
  private closeDialog(): void {
    this.setState({
      confirmationDialogVisible: false
    });
  }

  @autobind
  private onChooseTheme(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.props.chooseTheme(editorThemes[item.key]);
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterEditorProps{
	return {
		theme: state.code.theme
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterEditorProps>): IColumnFormatterEditorProps{
	return {
    changeUIState: (state:uiState) => {
      dispatch(changeUIState(state));
    },
		paneResized: (size:number) => {
			dispatch(resizePane('main', size));
    },
    chooseTheme: (theme:editorThemes) => {
      dispatch(chooseTheme(theme));
    }
	};
}

export const ColumnFormatterEditor = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterEditor_);