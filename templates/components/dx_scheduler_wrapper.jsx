import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Scheduler, DayView, WeekView, Appointments} from '@devexpress/dx-react-scheduler-material-ui';

const PREFIX = 'Demo';

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
};

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
  [`&.${classes.todayCell}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  [`&.${classes.weekendCell}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
}));

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
  [`&.${classes.today}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  [`&.${classes.weekend}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
}));

const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
  } if (date.getDay() === 0 || date.getDay() === 6) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />;
  } return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const { startDate, today } = props;

  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
  } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />;
  } return <StyledWeekViewDayScaleCell {...props} />;
};

export default function SchedulerWrap(props) {
  return (
    <Paper>
      <Scheduler
        data={props.data}
        firstDayOfWeek={1}
        locale='ua-UA'
      >
        <ViewState currentDate={props.currentDate} />
        {/*<DayView startDayHour={8} endDayHour={18} />*/}
        <WeekView
          startDayHour={8}
          endDayHour={18}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
          cellDuration={60}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}

SchedulerWrap.defaultProps = {
  currentDate: '',
  data: ''
}
