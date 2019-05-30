import React from 'react';
import Task from './Task';
import './Chart.css';
import {connect} from 'react-redux';

class Chart extends React.Component{
    
    render(){
        const {data = []} = this.props;
        return(
            <div className = 'Charts'>
                {data && data.map((task, index)=>{
                    return (
                        <div className = 'Charts_container' key = {index}>
                            <Task data = {task}/>
                        </div>

                    );
                })}
            </div>

        );
    }
}

const mapStateToProps=state=>{
    return{
        ...state.reducer
    }
}

export default connect(mapStateToProps)(Chart);