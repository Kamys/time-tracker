import * as React from 'react';
import DayPicker, { RangeModifier } from 'react-day-picker';
import { dateUtils } from 'react-day-picker/utils';

import './index.css';

export interface IProps {
    numberOfMonths?: number;
    onSelectRange: (IDateRange) => void;
    range: RangeModifier;
}

const SelectRange = (props: IProps) => {
    const {range} = props;
    const {from, to} = range;

    const onDayClick = (day) => {
        const selectedRange = dateUtils.addDayToRange(day, range);
        props.onSelectRange(selectedRange);
    }

    const modifiers = {start: from, end: to};

    return (
        <div className="RangeExample">
            <DayPicker
                className="Selectable"
                numberOfMonths={props.numberOfMonths}
                selectedDays={[from, {from, to}]}
                modifiers={modifiers}
                onDayClick={onDayClick}
            />
        </div>
    );
};

SelectRange.defaultProps = {
    numberOfMonths: 1,
};

export default SelectRange;
