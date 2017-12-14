import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { resizePane } from '../state/Actions';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { chooseTheme } from '../state/Actions';
import { IApplicationState, editorThemes } from '../state/State';
var SplitPane = require('react-split-pane');

import ColumnFormatterPropertyPane from './Panes/ColumnFormatterPropertyPane';
import { ColumnFormatterViewPane } from './Panes/ColumnFormatterViewPane';

export interface IColumnFormatterProps {
  theme?: editorThemes;
  paneResized?: (size:number) => void;
  chooseTheme?: (theme:editorThemes) => void;
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
              key: 'theme',
              name: 'Editor Theme',
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
      </div>
    );
  }

  @autobind
  private onChooseTheme(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.props.chooseTheme(editorThemes[item.key]);
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterProps{
	return {
		theme: state.code.theme
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterProps>): IColumnFormatterProps{
	return {
		paneResized: (size:number) => {
			dispatch(resizePane('main', size));
    },
    chooseTheme: (theme:editorThemes) => {
      dispatch(chooseTheme(theme));
    }
	};
}

export const ColumnFormatter = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatter_);