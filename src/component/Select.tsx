import React from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export interface Props<Enum extends string | number | boolean> {
    list: Enum[];
    value: Enum;
    onChange: (value: Enum) => void;
    translator?: (value: Enum) => string;
}

export class EnumSelect<Enum extends string | number | boolean> extends React.PureComponent<Props<Enum>> {
    static displayName = 'EnumSelect';

    onChange = (e: SelectChangeEvent<Enum>) => {
        this.props.onChange(e.target.value as Enum);
    };

    override render() {
        const { list, translator, value } = this.props;

        return (
            <MuiSelect value={value} onChange={this.onChange}>
                {list.map((value, index) => (
                    <MenuItem key={index} value={value as any}>
                        {translator?.(value) || `${value}`}
                    </MenuItem>
                ))}
            </MuiSelect>
        );
    }
}
