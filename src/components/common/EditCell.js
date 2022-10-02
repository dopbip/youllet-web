
import React from "react";
import { Cell } from "rsuite-table";
export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
    return (
      <Cell {...props}>
        {rowData.status === 'EDIT' ? (
          <input
            className="input"
            defaultValue={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          rowData[dataKey]
        )}
      </Cell>
    );
  };