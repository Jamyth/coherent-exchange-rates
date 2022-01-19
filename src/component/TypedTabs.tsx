import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { ObjectUtil } from '@iamyth/util';
import type { SafeReactChild } from '@iamyth/util';

export interface TypedTabProps {
    title: string;
    content: SafeReactChild;
}

export type TypedTabMap<T extends string> = Record<T, TypedTabProps>;

export interface Props<T extends string> {
    activeKey: T;
    onChange: (tab: T) => void;
    tabMap: TypedTabMap<T>;
}

export class TypedTabs<T extends string> extends React.PureComponent<Props<T>> {
    static displayName = 'TypedTabs';

    onTabChange = (_: any, value: any) => {
        this.props.onChange(value as T);
    };

    override render() {
        const { activeKey, tabMap } = this.props;
        return (
            <Box sx={{ width: '100%' }}>
                <Tabs value={activeKey} onChange={this.onTabChange} centered>
                    {ObjectUtil.toArray(tabMap, (key, tab) => (
                        <Tab key={key} label={tab.title} value={key} />
                    ))}
                </Tabs>
                {ObjectUtil.toArray(tabMap, (key, tab) => {
                    if (key === activeKey) {
                        return <React.Fragment key={key}>{tab.content}</React.Fragment>;
                    }
                    return null;
                })}
            </Box>
        );
    }
}
