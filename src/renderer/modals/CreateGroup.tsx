import { Component } from 'react';
import * as React from 'react';
import { Button, Image, Modal, Form, Grid } from 'semantic-ui-react';
import { connectModal, InjectedProps } from 'redux-modal';

import { ModalName } from './constants';
import { GlobalAction } from 'renderer/store/globalActions';

import './index.css';

export interface IState {
    name: string;
    description: string;
}

export interface IProps extends InjectedProps {
    text: number
}

class CreateGroup extends Component<IProps, IState> {

    state: IState = {
        name: '',
        description: '',
    };

    onCreateGroup = () => {
        const {name, description} = this.state
        GlobalAction.group.create.REQUEST({name, description})
    }

    onChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [name]: event.target.value,
        } as any)
    }

    render() {
        const {show, handleHide} = this.props;

        return (
            <Modal dimmer={'blurring'} open={show} onClose={handleHide}>
                <Modal.Header>Create group</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid columns={2} textAlign='left'>
                            <Grid.Row stretched>
                                <Grid.Column computer={3}>
                                    <Form.Field>
                                        <Image
                                            src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                            size='small'
                                            rounded
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Input
                                        fluid
                                        label='Name'
                                        placeholder='Work, Social network, News ...'
                                        onChange={this.onChange('name')}
                                    />
                                    <Form.Input
                                        fluid
                                        label='Description (optional)'
                                        placeholder={`It's my best group :)`}
                                        onChange={this.onChange('description')}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.onCreateGroup}>
                        Create
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connectModal({name: ModalName.FormGroup})(CreateGroup)
