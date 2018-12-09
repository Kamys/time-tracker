import * as React from "react";
import { Menu } from "semantic-ui-react";
import { TypeTabs } from "../application/constants";

interface IProps {
    tabs: TypeTabs[];
    activeTabs: TypeTabs
    onSelectTab: (tabs: TypeTabs) => () => void;
}

const Tabs = ({tabs, activeTabs, onSelectTab}: IProps) => (
    <Menu pointing>
        {
            tabs.map(tab => (
                <Menu.Item
                    key={tab}
                    name={tab}
                    active={activeTabs === tab}
                    onClick={onSelectTab(tab)}
                />
            ))
        }
    </Menu>
)

export default Tabs;
