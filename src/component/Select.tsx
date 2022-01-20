import React from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { ControlledFormValue } from '@iamyth/util';

export interface Props<Enum extends string | number | boolean, AllowMultiple extends boolean>
    extends ControlledFormValue<AllowMultiple extends true ? Enum[] : Enum> {
    list: Enum[];
    multiple: AllowMultiple;
    placeholder?: string;
    translator?: (value: Enum) => string;
}

export class EnumSelect<
    Enum extends string | number | boolean,
    AllowMultiple extends boolean,
> extends React.PureComponent<Props<Enum, AllowMultiple>> {
    static displayName = 'EnumSelect';

    onChange = (e: SelectChangeEvent<Enum>) => {
        const { multiple } = this.props;
        if (multiple) {
            this.props.onChange(String(e.target.value).split(',') as any);
        } else {
            this.props.onChange(e.target.value as any);
        }
    };

    override render() {
        const { list, translator, value, multiple, placeholder } = this.props;

        return (
            <MuiSelect placeholder={placeholder} multiple={multiple} value={value as any} onChange={this.onChange}>
                {list.map((value, index) => (
                    <MenuItem key={index} value={value as any}>
                        {translator?.(value) || `${value}`}
                    </MenuItem>
                ))}
            </MuiSelect>
        );
    }
}
