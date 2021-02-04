import React from 'react';
import './Meetings.scss';
import moment from 'moment';
import 'moment/locale/fr';

const MeetingsCard = ({ meeting, environment }) => {
  moment.locale('fr');

  return (
    <div className="meetings-card">
      <h4>{environment === 'candidates' && meeting.company} </h4>
      <h4>
        {environment === 'companies' &&
          `${meeting.firstname} ${meeting.lastname}`}
      </h4>
      <p>{meeting.title}</p>
      <p>{moment(meeting.meeting_date).format('DD/MM/YYYY HH:mm')}</p>
    </div>
  );
};

export default MeetingsCard;
