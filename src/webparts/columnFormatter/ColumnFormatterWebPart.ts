import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ColumnFormatterWebPartStrings';
import { ColumnFormatter, IColumnFormatterProps} from './components/ColumnFormatter';
import pnp from "sp-pnp-js";

import { Store, createStore } from 'redux';
import { Provider, ProviderProps } from 'react-redux';
import { IApplicationState } from './state/State';
import { setContext } from './state/Actions';
import { cfReducer } from './state/Reducers';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export interface IColumnFormatterWebPartProps {
  description: string;
}

export default class ColumnFormatterWebPart extends BaseClientSideWebPart<IColumnFormatterWebPartProps> {

  private store: Store<IApplicationState>;

  public onInit(): Promise<void> {

    this.store = createStore(cfReducer);
    this.store.dispatch(setContext(Environment.type !== EnvironmentType.Local, this.context.pageContext.web.absoluteUrl));

    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ProviderProps > = React.createElement(
      Provider,
      {
        store: this.store,
        children: React.createElement(
          ColumnFormatter, {}
        )
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
