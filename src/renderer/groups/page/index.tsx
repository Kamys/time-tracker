import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import FloatButton from 'renderer/components/FloatButton';
import { GlobalAction } from "renderer/store/globalActions";
import { ModalName } from "renderer/modals/constants";

import './index.css'
import { IRootState } from 'renderer/store/rootReducer';

interface IState {

}

interface IProps {

}

const styleImage = src => ({backgroundImage: `url("${src}")`})

class PageGroups extends Component<IProps & injectProps, IState> {

    state: IState = {};

    onOpenGroupForm = () => {
        GlobalAction.showModal(ModalName.FormGroup);
    }

    render() {

        const {groups} = this.props;

        return (
            <Fragment>
                <Card.Group stackable itemsPerRow={4}>
                    {
                        groups.map(group => (
                            <Card key={group.id}>
                                <div
                                    className='groupImage'
                                    style={styleImage(group.image)}
                                >
                                    <div className='text'>
                                        {group.name}
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </Card.Group>
                <FloatButton text='+' onClick={this.onOpenGroupForm} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    groups: state.entries.group,
})

const dispatchToProps = (dispatch) => ({

})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(PageGroups)
