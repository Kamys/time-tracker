import * as React from 'react';
import { Component } from 'react';

import PageGroups from 'renderer/groups/page';
import PageActivity from 'renderer/activity/page';
import PageStatistics from 'renderer/statistics/page';
import Tabs from 'renderer/components/Tabs';
import FormGroupModal from 'renderer/groups/modals/FormGroup';
import { GlobalAction } from 'renderer/store/globalActions';
import { TypeTabs } from './constants';


interface IState {
    activeTabs: TypeTabs
}

interface IProps {

}

class Application extends Component<IProps, IState> {

    state: IState = {activeTabs: TypeTabs.Statistics}

    componentDidMount() {
        GlobalAction.electron.loadingStore.REQUEST()
    }

    onSelectTab = (tab: TypeTabs) => () => {
        this.setState({activeTabs: tab});
    }

    render() {
        const {activeTabs} = this.state

        const tabs = [TypeTabs.Activities, TypeTabs.Groups, TypeTabs.Statistics];
        return (
            <div style={{margin: 10, marginTop: 0}}>
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
                    <PageGroups />
                }
                {
                    activeTabs === TypeTabs.Statistics &&
                    <PageStatistics />
                }
                <FormGroupModal />
            </div>
        );
    }
}

export default Application;
