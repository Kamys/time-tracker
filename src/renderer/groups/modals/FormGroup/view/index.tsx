import { Component } from 'react';
import * as React from 'react';
import { Button, Image, Modal, Form, Grid } from 'semantic-ui-react';
import { InjectedProps } from 'redux-modal';

import { IGroup } from 'renderer/groups/model';

import './index.css';

interface IState {
    name: string;
    description: string;
    regExp: string;
}

export interface IProps extends InjectedProps {
    entity: IGroup;
    onSubmit: (newEntity) => void;
    actionName: string;
}

class FormGroup extends Component<IProps, IState> {

    state: IState = {
        name: '',
        description: '',
        regExp: '',
    };

    componentDidMount() {
        const {entity} = this.props;
        if (entity) {
            this.setState({
                ...entity,
            })
        }
    }

    onChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [name]: event.target.value,
        } as any)
    }

    render() {
        const {show, handleHide, actionName, onSubmit} = this.props;
        const group = this.state

        const defaultInputProps = (name: keyof IState) => ({
            onChange: this.onChange(name),
            value: this.state[name],
        })

        return (
            <Modal dimmer={'blurring'} open={show} onClose={handleHide}>
                <Modal.Header>{actionName} group</Modal.Header>
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
                                        {...defaultInputProps('name')}
                                        className='fields'
                                        fluid
                                        label='Name'
                                        placeholder='Work, Social network, News ...'
                                    />
                                    <Form.Input
                                        {...defaultInputProps('description')}
                                        className='fields'
                                        fluid
                                        label='Description (optional)'
                                        placeholder={`It's my best group :)`}
                                    />
                                    <Form.Input
                                        {...defaultInputProps('regExp')}
                                        className='fields'
                                        fluid
                                        label='Regular expressions (Used for connect  group with actions)'
                                        placeholder={`RegExp`}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => onSubmit(group)}>
                        {actionName}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default FormGroup
