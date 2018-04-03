import * as React from 'react';
import ActionButton from '../actionButton/actionButton';

   const commandProps = {
     view: {
       text: 'View',
       hint: 'View Pokemon Detail'
     },
   };

   const Command = ({id, onExecute}) => (<ActionButton {...commandProps[id], onExecute = {onExecute}}/>);
 export default Command;