import { Component } from 'react';
import * as React from 'react';

import { Table } from 'semantic-ui-react'

export interface IState {

}

export interface IProps {

}

class TableActivity extends Component<IProps, IState> {

    state: IState = {};

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Time (hour)</Table.HeaderCell>
                        <Table.HeaderCell>Group</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>No Name Specified</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default TableActivity;
