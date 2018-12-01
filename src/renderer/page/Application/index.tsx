import * as React from 'react';
import { Component } from 'react';
import { Menu } from "semantic-ui-react";
import { TypeTabs } from './constants';
import TableActivity from "../../components/TableActivity";

export interface IState {
    activeTabs: TypeTabs
}

export interface IProps {

}

class Application extends Component<IProps, IState> {

    state: IState = {activeTabs: TypeTabs.Activities}

    onSelectTab = (tab: TypeTabs) => () => {
        this.setState({activeTabs: tab});
    }

    render() {
        const {activeTabs} = this.state

        let tabs = [TypeTabs.Activities, TypeTabs.Groups];
        return (
            <div  style={{margin: 10, marginTop: 0}}>
                <Menu pointing>
                    {
                        tabs.map(tab => (
                            <Menu.Item
                                key={tab}
                                name={tab}
                                active={activeTabs === tab}
                                onClick={this.onSelectTab(tab)}
                            />
                        ))
                    }
                </Menu>
                <div>
                    {
                        activeTabs === TypeTabs.Activities &&
                        <TableActivity />
                    }
                </div>
            </div>
        );
    }
}

export default Application;
