import * as React from 'react';
import { Component } from 'react';

import Tabs from "renderer/components/Tabs";
import Groups from "renderer/groups/page";
import FormGroup from 'renderer/groups/page/FormGroup';
import PageActivity from 'renderer/activity/page';
import { TypeTabs } from './constants';
import { GlobalAction } from 'renderer/store/globalActions';


interface IState {
    activeTabs: TypeTabs
}

interface IProps {

}

class Application extends Component<IProps, IState> {

    state: IState = {activeTabs: TypeTabs.Groups}

    componentDidMount() {
        GlobalAction.electron.loadingStore.REQUEST()
    }

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
                    <PageActivity />
                }
                {
                    activeTabs === TypeTabs.Groups &&
                    <Groups />
                }
                <FormGroup />
            </div>
        );
    }
}

export default Application;
