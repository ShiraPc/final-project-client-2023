import React from 'react';
import '../../css/marker.css'

import { observer } from 'mobx-react';

const Marker = (props:any) => {
    const { color, name ,description} = props;
    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={'name: '+name+' '+'details: '+ description+' '}
        />
        <div className="pulse" />
      </div>
    );
};
  
export default observer(Marker);