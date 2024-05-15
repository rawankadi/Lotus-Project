import React, { Component } from "react";
import '../Aboutus/Aboutus.css';
import datas from '../../pages.json';



export default class Aboutus extends Component {

 


  render() {
    return (
      <div className="page">
        <div className="photopage"></div>
        {
          datas && datas.map(data => {
            const aboutUsData = data.AboutUs;
            if (!aboutUsData) return null; 

            return (
              <div className="body" key={aboutUsData.pageId}>
                <div className="title">{aboutUsData.title}</div>
                {aboutUsData.Content && aboutUsData.Content.description && aboutUsData.Content.description.map((item, index) => (
                  <p className="content" key={index}>{item}</p>
                ))}
                <div>
                  {aboutUsData.Content && (
                    <React.Fragment>
                      <div className="aboutus">
                          <p>{aboutUsData.Content.titleBased}: {aboutUsData.Content.based}</p>
                          <p>{aboutUsData.Content.titleEmail}: {aboutUsData.Content.contactEmail}</p>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}
