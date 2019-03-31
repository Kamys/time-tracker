import * as React from 'react';
import {Icon, Menu, Table} from 'semantic-ui-react'
// @ts-ignore //TODO: strange ts error
import * as range from 'lodash/range'

import {formatSecond} from 'renderer/activity/utils';
import {IActivity} from 'renderer/activity/model';
import modulePagination from 'renderer/modulePagination';

interface IProps {
    activities: IActivity[];
}

const TableActivity = (props: IProps) => {
    const {activities} = props;

    console.log('activities.length: ', activities.length);
    const pagination = modulePagination.usePagination(activities, 3);
    const currentItems = pagination.getCurrentItems();

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    currentItems.map(({id, title, secondsSpent, group, date}) => (
                        <Table.Row key={title + secondsSpent}>
                            <Table.Cell>{title}</Table.Cell>
                            <Table.Cell>{formatSecond(secondsSpent)}</Table.Cell>
                            <Table.Cell>{date}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Pagination
                            onNext={pagination.nextPage}
                            onBack={pagination.previousPage}
                            onSelectPage={pagination.setCurrentPage}
                            countPage={pagination.getMaxPage()}
                            currentPage={pagination.getCurrentPage()}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

interface IPaginationProps {
    onBack: () => void;
    onNext: () => void;
    onSelectPage: (pageIndex: number) => void;
    countPage: number;
    currentPage: number;
}

const Pagination = (props: IPaginationProps) => {
    const {
        onBack,
        onNext,
        onSelectPage,
        countPage,
        currentPage,
    } = props;

    return (
        <Menu floated='right' pagination>
            <Menu.Item as='a' icon onClick={onBack}>
                <Icon name='chevron left'/>
            </Menu.Item>
            {
                range(1, countPage + 1).map(pageIndex => (
                    <Menu.Item
                        active={pageIndex === currentPage}
                        onClick={() => onSelectPage(pageIndex)}
                        key={pageIndex}
                        as='a'
                    >
                        {pageIndex}
                    </Menu.Item>
                ))
            }
            <Menu.Item as='a' icon onClick={onNext}>
                <Icon name='chevron right'/>
            </Menu.Item>
        </Menu>
    );
}

export default TableActivity;
