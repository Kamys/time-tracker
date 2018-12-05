import * as React from 'react';
import { Button, IconProps } from "semantic-ui-react";
import { SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";
import './index.css'

export interface IProps {
    text?: string;
    icon?: SemanticShorthandItem<IconProps>;
    onClick: () => void;
}

const FloatButton = ({text, icon, onClick}: IProps) => (
    <Button
        className='floatPosition floatButtonShadows'
        color='teal'
        circular
        icon={icon}
        onClick={onClick}
    >
        <div className='floatText'>{text}</div>
    </Button>
)

export default FloatButton;
