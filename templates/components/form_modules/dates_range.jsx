'use strict';
import * as React from 'react';
import {DateRange} from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import {Modal} from 'react-responsive-modal';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class DatesRange extends React.Component {
  state = {
    dates_range: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  };

  openDatesRangeModal = () => {
    this.setState({modal_is_opened: true});
  };

  closeDatesRangeModal = () => {
    this.setState({modal_is_opened: false});
  };

  handleSelect = (ranges) => {
    this.setState({
      dates_range: {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: 'selection'
      }
    });
    this.props.onChange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate
    });
  };

  render() {
    const {dates_range} = this.state;
    return (
      <div className={'mt-2 ' + this.props.className}>
        <div>Дата або період:</div>
        <div className='h-100'>
          <DateRange ranges={[dates_range]} onChange={this.handleSelect} locale={locales.uk} />

        </div>
      </div>
    );
  }

  static defaultProps = {
    date: '',
    fieldName: '',
    onChange: () => {},
    disabled: false,
    className: ''
  };
}

export default DatesRange;
