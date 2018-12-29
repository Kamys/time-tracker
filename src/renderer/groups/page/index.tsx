import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import FloatButton from 'renderer/components/FloatButton';
import { GlobalAction } from 'renderer/store/globalActions';
import { ModalName } from 'renderer/modals/constants';
import { IRootState } from 'renderer/store/rootReducer';

import './index.css'

interface IProps {

}

const styleImage = src => ({backgroundImage: `url("${src}")`})

const PageGroups = ({groups}: IProps & injectProps) => (
        <Fragment>
            <Card.Group stackable itemsPerRow={4}>
                {
                    groups.map(group => (
                        <Card
                            key={group.id}
                            onClick={() => GlobalAction.showModal(ModalName.FormGroup)}
                        >
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
            <FloatButton
                text='+'
                onClick={() => GlobalAction.showModal(ModalName.FormGroup)}
            />
        </Fragment>
    );

const mapStateToProps = (state: IRootState) => ({
    groups: state.entries.group,
})

const dispatchToProps = (dispatch) => ({

})

type injectProps = ReturnType<typeof mapStateToProps>;

export default connect<injectProps, IProps>(mapStateToProps, dispatchToProps)(PageGroups)
