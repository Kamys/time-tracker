import * as React from 'react';
import {Table} from 'semantic-ui-react'

import {formatSecond} from 'renderer/activity/utils';
import {IActivity} from 'renderer/activity/model';
import modulePagination from 'renderer/modulePagination';
import Pagination from "renderer/modulePagination/components/Pagination";

interface IProps {
    activities: IActivity[];
}

const TableActivity = (props: IProps) => {
    const {activities} = props;

    const pagination = modulePagination.usePagination(activities, 15);
    const currentItems = pagination.getCurrentItems();
    const maxPage = pagination.getMaxPage();
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
                        <Row
                            key={title}
                            title={title}
                            secondsSpent={secondsSpent}
                            date={date}
                        />
                    ))
                }
            </Table.Body>
            {
                maxPage > 1 &&
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                onNext={pagination.nextPage}
                                onBack={pagination.previousPage}
                                onSelectPage={pagination.setCurrentPage}
                                countPage={maxPage}
                                currentPage={pagination.getCurrentPage()}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            }
        </Table>
    );
}

interface IRowProps {
    title: string;
    secondsSpent: number;
    date: string;
}

const Row = React.memo(({title, secondsSpent, date}: IRowProps) => (
    <Table.Row>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{formatSecond(secondsSpent)}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
    </Table.Row>
))



export default TableActivity;
