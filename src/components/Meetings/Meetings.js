import React, { useContext, useEffect, useState } from 'react';
import API from '../../services/API';
import { UserContext } from '../../contexts/UserContext';
import './Meetings.scss';
import MeetingsCard from './MeetingsCard';

const Meetings = () => {
  const [meetingsList, setMeetingsList] = useState([]);
  const { userDetails, environment, loggedIn } = useContext(UserContext);

  useEffect(() => {
    if (environment === 'candidates') {
      API.get(`/candidates/${userDetails.id}/offers`).then((res) => {
        setMeetingsList(res.data);
        console.log(res.data);
      });
    }
    if (environment === 'companies') {
      API.get(`/companies/${userDetails.id}/applies`).then((res) =>
        setMeetingsList(res.data)
      );
    }
  }, [environment]);

  const showMeetings = () => {
    if (loggedIn) {
      return (
        <div className="meetings-container">
          <h3>Mes rendez-vous</h3>
          {meetingsList.length === 0 ? (
            <p>Aucun rendez-vous prévu</p>
          ) : (
            meetingsList.map((meeting) => {
              return (
                meeting.meeting_date && (
                  <MeetingsCard meeting={meeting} environment={environment} />
                )
              );
            })
          )}
        </div>
      );
    }
    return <></>;
  };
  return showMeetings();
};

export default Meetings;
