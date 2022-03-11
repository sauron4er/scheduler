import * as React from 'react';
import 'react-responsive-modal/styles.css';
import DateInput from 'templates/components/form_modules/date_input';
import 'static/css/radio.css';
import QuarterInput from 'templates/components/form_modules/quarter_input';

class DateOrQuarter extends React.PureComponent {
  state = {
    type: 'date_radio' //, quarter_radio
  };

  onTypeChange = (e) => {
    this.setState({type: e.target.id});
    this.props.onDateChange('');
    this.props.onQuarterChange('quarter', '');
    this.props.onQuarterChange('year', '');
  };

  onDateChange = (e) => {
    this.props.onDateChange(e.target.value);
  };

  onQuarterChange = (e) => {
    this.props.onQuarterChange(e.target.id, e.target.value);
  };

  render() {
    const {type} = this.state;
    const {date, quarter, year} = this.props;
    return (
      <div>
        <label htmlFor='date_radio' className='l-radio'>
          <input
            type='radio'
            id='date_radio'
            name='date_quarter_selector'
            tabIndex='1'
            onChange={this.onTypeChange}
            checked={type === 'date_radio'}
          />
          <span>Дата</span>
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
        <Choose>
          <When condition={type === 'date_radio'}>
            <DateInput className='mt-1' fieldName='Дата проведення' date={date} onChange={this.onDateChange} />
          </When>
          <Otherwise>
            <div>
              <QuarterInput quarter={quarter} year={year} onChange={this.onQuarterChange} />
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

export default DateOrQuarter;
