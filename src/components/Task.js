import React from 'react';
import {connect} from 'react-redux';
import {Chart, Doughnut} from 'react-chartjs-2';
import {Card} from 'react-bootstrap';
import './Task.css';


const ProgressData=props=>{
    return this.props.data.summary.map((summary, index)=>{
        return (
            <Card.Body key = {index}>
                <div className = 'footer'>
                    <div className = 'footerTitle'>
                        {summary.title}
                        <div className = 'footerValue'>{summary.value}</div>
                    </div>
                </div>
            </Card.Body>
        );
    })
}


class Task extends React.Component{
     getPercentage = (props)=>{
        let calculatePercentage = [];
        this.props.taskData.summary.map(summary=>{
            if(summary.title === 'Completed'){
                calculatePercentage[0]= Math.round((summary.value / this.props.taskData.total)*100)
                calculatePercentage[1]= calculatePercentage[0]-100;
            }
        })
        return calculatePercentage;
    }

    getDonought = ()=>{
    const percent = this.getPercentage();

    const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
        draw: function(){
            originalDoughnutDraw.apply(this, arguments);

            let chart = this.chart;
            let ctx = chart.ctx;
            let height = chart.height;
            let width = chart.width;

            let text = chart.config.data.text,
                textX = Math.round((width - ctx.measureText(text).width)/2),
                textY = height / 1.65;

            ctx.fillText(text, textX, textY)
        }
    });

    const data = {
        label: ['Completed', 'Remaining'],
        datasets:[{
            data: percent,
            background: ['#36a2de', '#ffffee'],
            borderColor: '#fffff',
            responsive: 'true'
        }],

        text: percent[0]+'%',
        weight: 0.60
    }
    return data
    };
    render() {
        const { taskData } = this.props;
        console.log(taskData);
        return (
          <div>       
          <Card.Header style={{ backgroundColor: "#cccc" }}>
            {taskData.title}
          </Card.Header>
              <Card.Body>
                <Doughnut
                  data={this.getDonought()}
                />
              </Card.Body>
              <ProgressData data={taskData} />       
          </div>
        );
      }
}

const mapStateToProps = state => {
    return {
      ...state.reducer
    };
  };
  
  export default connect(mapStateToProps)(Task);