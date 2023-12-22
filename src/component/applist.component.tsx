import {Card, List} from 'antd'
import {CategoryData} from "../types";
import React from "react";
import { RedoOutlined } from '@ant-design/icons'

import { ListProps } from './types'


export const AppList = (props: ListProps) => {
    return (
        <List
            locale={{ emptyText: <RedoOutlined/> }}
            itemLayout="vertical"
            dataSource={ props.dataSource }
            renderItem={ props.renderItem }
        />
    )
}