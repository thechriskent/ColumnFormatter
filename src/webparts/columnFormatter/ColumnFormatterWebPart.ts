import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ColumnFormatterWebPartStrings';
import ColumnFormatter, {IColumnFormatterProps} from './components/ColumnFormatter';

import { Store, createStore } from 'redux';
import { Provider, ProviderProps } from 'react-redux';
import { IApplicationState } from './state/State';
import { dataReducer } from './state/Reducers';

export interface IColumnFormatterWebPartProps {
  description: string;
}

export default class ColumnFormatterWebPart extends BaseClientSideWebPart<IColumnFormatterWebPartProps> {

  private store: Store<IApplicationState>;

  public onInit(): Promise<void> {

    this.store = createStore(dataReducer);

    return super.onInit();
  }

  public render(): void {
    /*const element: React.ReactElement<IColumnFormatterProps > = React.createElement(
      ColumnFormatter,
      {
        description: this.properties.description
      }
    );*/
    const element: React.ReactElement<ProviderProps > = React.createElement(
      Provider,
      {
        store: this.store,
        children: React.createElement(
          ColumnFormatter,
          {
            description: this.properties.description
          }
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
