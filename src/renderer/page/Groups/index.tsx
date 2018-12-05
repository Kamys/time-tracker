import * as React from 'react';
import { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react'

import FloatButton from 'renderer/components/FloatButton';
import './index.css'
import { GlobalAction } from "renderer/store/globalActions";
import { ModalName } from "renderer/modals/constants";

export interface IState {

}

export interface IProps {

}

const imageWork = 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&h=350'
const imageProcrastination = 'https://o-prirode.ru/wp-content/uploads/2018/05/lenivets-trekhpaliy-e1526833927933.jpg'
const imageSelfDevelopment = 'https://www.brisbane.qld.gov.au/sites/default/files/trumba/events/dgdzhbdbnghqvvogxw8biu7o_16.jpg'

const groups = [
    {name: 'Work', image: imageWork},
    {name: 'Self-development', image: imageSelfDevelopment},
    {name: 'Procrastination', image: imageProcrastination},
]

const styleImage = src => ({backgroundImage: `url("${src}")`})

class Groups extends Component<IProps, IState> {

    state: IState = {};

    onOpenGroupForm = () => {
        GlobalAction.showModal(ModalName.FormGroup);
    }

    render() {
        return (
            <Fragment>
                <Card.Group stackable itemsPerRow={4}>
                    {
                        groups.map(group => (
                            <Card>
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

export default Groups;
