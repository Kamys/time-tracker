import * as React from 'react';
import {Icon, Menu, Table} from 'semantic-ui-react'
// @ts-ignore //TODO: strange ts error
import * as range from 'lodash/range'

import {formatSecond} from 'renderer/activity/utils';
import {IActivity} from 'renderer/activity/model';
import modulePagination from 'renderer/modulePagination';

const activities = [
    {
        "id": "60159",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 1 start",
        "secondsSpent": 641423,
        "group": ""
    },
    {
        "id": "86158",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 2",
        "secondsSpent": 909567,
        "group": ""
    },
    {
        "id": "21389",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 3",
        "secondsSpent": 255582,
        "group": ""
    },
    {
        "id": "35790",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 4",
        "secondsSpent": 355480,
        "group": ""
    },
    {
        "id": "75875",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 5",
        "secondsSpent": 401345,
        "group": ""
    },
    {
        "id": "75249",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 6",
        "secondsSpent": 544293,
        "group": ""
    },
    {
        "id": "91661",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 7",
        "secondsSpent": 238483,
        "group": ""
    },
    {
        "id": "27290",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 8",
        "secondsSpent": 819878,
        "group": ""
    },
    {
        "id": "77556",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 9",
        "secondsSpent": 318716,
        "group": ""
    },
    {
        "id": "62509",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 10",
        "secondsSpent": 848318,
        "group": ""
    },
    {
        "id": "54046",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 11",
        "secondsSpent": 678478,
        "group": ""
    },
    {
        "id": "24429",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 12",
        "secondsSpent": 458184,
        "group": ""
    },
    {
        "id": "40560",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 13",
        "secondsSpent": 623728,
        "group": ""
    },
    {
        "id": "70846",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 14",
        "secondsSpent": 536655,
        "group": ""
    },
    {
        "id": "93894",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 15",
        "secondsSpent": 373237,
        "group": ""
    },
    {
        "id": "95270",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 16",
        "secondsSpent": 606494,
        "group": ""
    },
    {
        "id": "82682",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 17",
        "secondsSpent": 406353,
        "group": ""
    },
    {
        "id": "87553",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 18",
        "secondsSpent": 56135,
        "group": ""
    },
    {
        "id": "55813",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 19",
        "secondsSpent": 169971,
        "group": ""
    },
    {
        "id": "53405",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 20",
        "secondsSpent": 984545,
        "group": ""
    },
    {
        "id": "13588",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 21",
        "secondsSpent": 222300,
        "group": ""
    },
    {
        "id": "97575",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 22",
        "secondsSpent": 427893,
        "group": ""
    },
    {
        "id": "85683",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 23",
        "secondsSpent": 568729,
        "group": ""
    },
    {
        "id": "31277",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 24",
        "secondsSpent": 855035,
        "group": ""
    },
    {
        "id": "57162",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 25",
        "secondsSpent": 783209,
        "group": ""
    },
    {
        "id": "27163",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 26",
        "secondsSpent": 640539,
        "group": ""
    },
    {
        "id": "44252",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 27",
        "secondsSpent": 47406,
        "group": ""
    },
    {
        "id": "44241",
        "date": "Wed Mar 27 2019 04:15:13 GMT+0300",
        "title": "Item 28 end",
        "secondsSpent": 996014,
        "group": ""
    },
]

interface IProps {
    activities: IActivity[];
}

const TableActivity = (props: IProps) => {
    //const {activities} = props;

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
    console.log('Pagination: ', props);
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
