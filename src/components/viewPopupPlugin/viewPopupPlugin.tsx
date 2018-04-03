import * as React from 'react';
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder
} from '@devexpress/dx-react-core';

export interface PopupProp {
  popupComponent: any,
}

export default class EditPopupPlugin extends React.PureComponent<PopupProp, object> {
  state = {
    pokemon: {},
    open: false,
  }

  render() {
    const { popupComponent: Popup } = this.props;
    return (
      <Plugin>
        <Template name="viewPopup">
          <TemplateConnector>
            {(
              {
                rows,
                getRowId,
                editingRowIds,
                createRowChange,
                rowChanges,
                isColumnEditingEnabled
              },
              { changeRow, commitChangedRows, stopEditRows }
            ) => {
              const rowId = editingRowIds[0];
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];

              const changedRow = { ...targetRow, ...rowChanges[rowId] };
              const processValueChange = (fieldName, newValue) => {
                const changeArgs = {
                  rowId,
                  change: createRowChange(changedRow, newValue, fieldName)
                };
                changeRow(changeArgs);
              };
              const applyChanges = () => {
                stopEditRows({ rowIds: editingRowIds });
                commitChangedRows({ rowIds: editingRowIds });
              };
              const cancelChanges = () => {
                stopEditRows({ rowIds: editingRowIds });
              };

              return (
                <Popup
                  open={this.state.open}
                  row={targetRow}
                  pokemon={this.state.pokemon}
                  onChange={processValueChange}
                  onApplyChanges={applyChanges}
                  onCancelChanges={cancelChanges}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="root">
          <TemplatePlaceholder />
          <TemplatePlaceholder name="viewPopup" />
        </Template>
      </Plugin>
    );
  }
}
