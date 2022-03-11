import * as React from 'react';
import 'react-responsive-modal/styles.css';
import DateInput from 'templates/components/form_modules/date_input';
import 'static/css/radio.css';
import QuarterInput from 'templates/components/form_modules/quarter_input';
import DatesRange from 'templates/components/form_modules/dates_range';

class DateRangeQuarterYear extends React.PureComponent {
  state = {
    type: 'date_range_radio' //, quarter_radio, year_radio
  };

  onTypeChange = (e) => {
    this.setState({type: e.target.id});
    this.props.onQuarterChange({
      quarter: '',
      year: ''
    });
    this.props.onYearChange('');
    if (e.target.id === 'date_range_radio') {
      this.props.onDateRangeChange({
        startDate: new Date(),
        endDate: new Date()
      });
    } else {
      this.props.onDateRangeChange('');
    }
  };

  onDateRangeChange = (e) => {
    this.props.onDateRangeChange(e);
  };

  onQuarterChange = (e) => {
    switch (e.target.id) {
      case 'quarter':
        this.props.onQuarterChange({quarter: e.target.value, year: this.props.quarter.year});
        break;
      default:
        this.props.onQuarterChange({quarter: this.props.quarter.quarter, year: e.target.value});
    }

  };

  onYearChange = (e) => {
    const year = parseInt(e.target.value);
    if (!isNaN(year)) this.props.onYearChange(e.target.value);
  };

  render() {
    const {type} = this.state;
    const {quarter, year} = this.props;

    return (
      <div>
        <label htmlFor='date_range_radio' className='l-radio'>
          <input
            type='radio'
            id='date_range_radio'
            name='date_range_selector'
            tabIndex='1'
            onChange={this.onTypeChange}
            checked={type === 'date_range_radio'}
          />
          <span>Період</span>
        </label>
        <label htmlFor='quarter_radio' className='l-radio'>
          <input
            type='radio'
            id='quarter_radio'
            name='date_quarter_selector'
            tabIndex='2'
            onChange={this.onTypeChange}
            checked={type === 'quarter_radio'}
          />
          <span>Квартал</span>
        </label>
        <label htmlFor='year_radio' className='l-radio'>
          <input
            type='radio'
            id='year_radio'
            name='date_year_selector'
            tabIndex='2'
            onChange={this.onTypeChange}
            checked={type === 'year_radio'}
          />
          <span>Рік</span>
        </label>
        <Choose>
          <When condition={type === 'date_range_radio'}>
            <DatesRange onChange={this.onDateRangeChange} />
          </When>
          <When condition={type === 'quarter_radio'}>
            <QuarterInput quarter={quarter} year={year} onChange={this.onQuarterChange} />
          </When>
          <Otherwise>
            <div>
              <label className='text-nowrap mt-1' htmlFor='year'>
                <div className='mr-1'>Рік: </div>
                <input
                  className='form-control'
                  id='year'
                  pattern='[0-9.]+'
                  maxLength={4}
                  value={year}
                  size={4}
                  onChange={this.onYearChange}
                />
              </label>
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }

  static defaultProps = {
    date: '',
    quarter: '',
    year: '',
    onDateChange: () => {},
    onQuarterChange: () => {}
  };
}

export default DateRangeQuarterYear;
