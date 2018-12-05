import * as React from 'react';
import { Button, IconProps } from "semantic-ui-react";
import { SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";
import './index.css'

export interface IProps {
    text?: string;
    icon?: SemanticShorthandItem<IconProps>;
}

const FloatButton = ({text, icon}: IProps) => (
    <Button
        className='floatPosition floatButtonShadows'
        color='teal'
        circular
        icon={icon}
    >
        <div className='floatText'>{text}</div>
    </Button>
)

export default FloatButton;
