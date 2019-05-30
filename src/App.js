import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Chart from './components/Chart';

export default ()=>(
  <Provider store = {store}>
    <Chart/>
  </Provider>
)