import React from 'react';
import { ReactUtil } from '@iamyth/util';

export const Main = ReactUtil.memo('Main', () => {
    return (
        <div>
            <h1>Hello Main</h1>
        </div>
    );
});
