import React, { Component } from 'react';
import './Service.css';
import Data from '../../pages.json';
import dashboardIcon from '../images/dashboard.png';
import recruitmentIcon from '../images/recruitment.png';
import timesheetIcon from '../images/timesheet.png';

export default class Service extends Component {
  render() {
    const getImage = (title) => {
      switch (title) {
        case 'Dashboard':
          return dashboardIcon;
        case 'Recruitment':
          return recruitmentIcon;
        case 'Timesheet':
          return timesheetIcon;
        default:
          return null;
      }};
    return (
      <div className='page'>
        {Data && Data.map(data => {
          const serviceData = data.Home;
          if (!serviceData) return null;
          

          return (
            <div key={serviceData.pageId} className="service-page">
              <div className="welcome-section">
                <div id='backPhoto'></div>
                  <div className="welcome-text">
                    <h1>{serviceData.title}</h1>
                    <h3>{serviceData.description}</h3>
                  </div>
              </div>
              <div className="services-section">
                {serviceData.services.map((service, index) => (
                  <div key={index} className="service-item">
                    <img src={getImage(service.title)} alt={service.title} />
                    <h3>{service.title}</h3>
                    <button>Let's Start</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    );
  }
}
