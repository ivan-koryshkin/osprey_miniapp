import {ReactNode} from "react";

export interface ListProps {
    dataSource: any[]
    renderItem: (item) => ReactNode
}