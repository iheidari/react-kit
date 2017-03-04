import React from 'react';

class CalendarHeader extends React.Component {
    handleClickPrevious = () => {
        const newDisplayDate = new Date(this.props.displayDate);
        newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
        this.props.onChange(newDisplayDate);
    }

    handleClickNext = () => {
        const newDisplayDate = new Date(this.props.displayDate);
        newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
        this.props.onChange(newDisplayDate);
    }

    render() {
        return (
            <div className="text-center">
                <div className="text-muted pull-left" onClick={this.handleClickPrevious} style={{ cursor: 'pointer' }}>{this.props.previousButtonElement}</div>
                <span>{this.props.monthLabels[this.props.displayDate.getMonth()]} {this.props.displayDate.getFullYear()}</span>
                <div className="text-muted pull-right" onClick={this.handleClickNext} style={{ cursor: 'pointer' }}>{this.props.nextButtonElement}</div>
            </div>
        );
    }
}

CalendarHeader.displayName = 'DatePickerHeader';
CalendarHeader.propTypes = {
    displayDate: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    monthLabels: React.PropTypes.array.isRequired,
    previousButtonElement: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ]).isRequired,
    nextButtonElement: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ]).isRequired,
};

export default CalendarHeader;