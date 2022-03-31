import * as React from 'react';
import './my_scheduler.css'


class MyScheduler extends React.PureComponent {
  state = {
    today_in_this_week_index: 0,

    visits: [],

    clients_columns: [
      {name: 'name', title: 'Ім’я'},
      {name: 'phone', title: 'Телефон'}
    ],
    clients_column_width: [{columnName: 'phone', width: 150}],

    opened_visit: '',

    client_visits: [], // список майбутніх візитів клієнта

    new_note: '',
    new_client: '',
    new_client_id: '',
    new_start: '',
    new_finish: '',
    new_doctor: '',
    new_doctor_id: null,

    doctors: [],
    doctor: '',
    doctor_id: null,
    start: '',
    finish: '',
    note: '',
    client: '',
    client_id: '',
    price: '',

    modal_is_opened: false,
    edit_modal_is_opened: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.getTodayInThisWeekIndex()
  }

  componentDidMount() {
    this.getVisits();
    this.getDoctors();
  }

  getVisits = () => {

  };

  getDoctors = () => {

  };

  getTodayInThisWeekIndex = () => {
    const {week} = this.props;
    const today = new Date()
    const today_string = `${("0" + today.getDate()).slice(-2)}.${("0" + (today.getMonth() + 1)).slice(-2)}`

    let today_in_this_week_index = 0
    for (let i = 0; i < week.length; i++) {
      if (week[i] === today_string) today_in_this_week_index = i+1;
    }

    this.setState({today_in_this_week_index})
  }

  onChange = (event) => {
    if (event.target.name === 'new_doctor') {
      const selectedIndex = event.target.options.selectedIndex;
      this.setState({
        new_doctor_id: event.target.options[selectedIndex].getAttribute('data-key'),
        new_doctor: event.target.options[selectedIndex].getAttribute('value')
      });
    } else if (event.target.name === 'doctor') {
      const selectedIndex = event.target.options.selectedIndex;
      this.setState({
        doctor_id: event.target.options[selectedIndex].getAttribute('data-key'),
        doctor: event.target.options[selectedIndex].getAttribute('value')
      });
    } else if (event.target.name === 'price') {
      this.setState({
        [event.target.name]: event.target.value.replace(/\D/, '')
      });
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  };


  render() {
    const {visits, today_in_this_week_index} = this.state;
    const {today, week} = this.props;

    return (
      <>
        <table className="table table-sm scheduler">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" className={today_in_this_week_index === 1 ? 'today' : ''}>Пн, {week[0]}</th>
            <th scope="col" className={today_in_this_week_index === 2 ? 'today' : ''}>Вт, {week[1]}</th>
            <th scope="col" className={today_in_this_week_index === 3 ? 'today' : ''}>Ср, {week[2]}</th>
            <th scope="col" className={today_in_this_week_index === 4 ? 'today' : ''}>Чт, {week[3]}</th>
            <th scope="col" className={today_in_this_week_index === 5 ? 'today' : ''}>Пт, {week[4]}</th>
            <th scope="col" className={today_in_this_week_index === 6 ? 'today' : ''}>Сб, {week[5]}</th>
            <th scope="col" className={today_in_this_week_index === 7 ? 'today' : ''}>Нд, {week[6]}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className='time'>8:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>9:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>10:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>11:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>12:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>13:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>14:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>15:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>16:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>17:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className='time'>18:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </>
    );
  }

  static defaultProps = {
    week: []
  }
}

export default MyScheduler;
