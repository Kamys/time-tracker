import { Component } from 'react';
import * as React from 'react';
import TableActivity from "../../components/TableActivity";

export interface IState {

}

export interface IProps {

}

class Application extends Component<IProps, IState> {

    state: IState = {};

    render() {
        return (
            <div style={{margin: 20}}>
                <TableActivity />
            </div>
        );
    }
}

export default Application;
