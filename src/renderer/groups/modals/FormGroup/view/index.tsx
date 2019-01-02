import { Component } from 'react';
import * as React from 'react';
import { Button, Image, Modal, Form, Grid } from 'semantic-ui-react';
import { InjectedProps } from 'redux-modal';

import { IGroup } from 'renderer/groups/model';

import './index.css';
import { IFormProps, IModalAction } from 'renderer/modals/model';

interface IState {
    name: string;
    description: string;
    regExp: string;
}

interface IProps extends InjectedProps, IFormProps {

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
        const {show, handleHide, actions, header} = this.props;
        const group = this.state

        const defaultInputProps = (name: keyof IState) => ({
            onChange: this.onChange(name),
            value: this.state[name],
        })

        return (
            <Modal dimmer={'blurring'} open={show} onClose={handleHide}>
                <Modal.Header>{header}</Modal.Header>
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
                    {
                        actions.map(action => (
                            <Button color='black' onClick={() => action.onClick(group)}>
                                {action.title}
                            </Button>
                        ))
                    }
                </Modal.Actions>
            </Modal>
        );
    }
}

export default FormGroup
