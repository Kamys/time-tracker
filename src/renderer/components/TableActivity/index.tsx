import * as React from 'react';
import { Component } from 'react';
import { Table } from 'semantic-ui-react'

import { formatSecond } from 'renderer/activity/utils';
import { IActivity } from 'renderer/activity/model';


interface IState {
}

interface IProps {
    activities: IActivity[];
}

class TableActivity extends Component<IProps, IState> {

    render() {
        const {activities} = this.props;

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Group</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        activities.map(({title, secondsSpent, group, date}) => (
                            <Table.Row key={title}>
                                <Table.Cell>{title}</Table.Cell>
                                <Table.Cell>{formatSecond(secondsSpent)}</Table.Cell>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{group}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}

export default TableActivity;
