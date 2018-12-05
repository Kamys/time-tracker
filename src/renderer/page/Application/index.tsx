import * as React from 'react';
import { Component } from 'react';

import Tabs from "renderer/components/Tabs";
import TableActivity from "renderer/components/TableActivity";
import Groups from "renderer/page/Groups";
import { TypeTabs } from './constants';


export interface IState {
    activeTabs: TypeTabs
}

export interface IProps {

}

class Application extends Component<IProps, IState> {

    state: IState = {activeTabs: TypeTabs.Groups}

    onSelectTab = (tab: TypeTabs) => () => {
        this.setState({activeTabs: tab});
    }

    render() {
        const {activeTabs} = this.state

        let tabs = [TypeTabs.Activities, TypeTabs.Groups];
        return (
            <div  style={{margin: 10, marginTop: 0}}>
                <Tabs
                    tabs={tabs}
                    activeTabs={activeTabs}
                    onSelectTab={this.onSelectTab}
                />
                {
                    activeTabs === TypeTabs.Activities &&
                    <TableActivity />
                }
                {
                    activeTabs === TypeTabs.Groups &&
                    <Groups />
                }
            </div>
        );
    }
}

export default Application;
