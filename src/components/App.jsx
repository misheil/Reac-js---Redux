import React, { Component } from 'react';
import { connect } from 'react-redux';  
//connect: -- to connect mapSetProps function and mapDispatch function

//import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder,clearReminders } from '../actions';
import moment from 'moment';


class App extends Component{
    constructor(props){
    super(props);
    this.state={
    text:'',
    dueDate: ''
      }
    }

    addReminder(){
    //console.log('This state ', this.state);
    console.log('This.state.dueDate ', this.state.dueDate);
    console.log('This  ', this);
    this.props.addReminder(this.state.text,this.state.dueDate);
    };

    deleteReminder(id){
    console.log('Deleting in application  ', id);
    console.log('This.props  ', this.props);
    this.props.deleteReminder(id);
    }

    renderReminders(){
    const {reminders}= this.props;
    //console.log('reminders',reminders);
    return(
    <ul className="list-group col-sm-4">
      {
        reminders.map(reminder => {
        return(
         <li key={reminder.id} className="list-group-item">

           <div className="list-item">
           <div>{reminder.text}</div>
           <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</ em></div>
           </div>
           
           <div onClick={() => this.deleteReminder(reminder.id)} className="list-item delete-button">
            &#x2715;
           </div>
         
         </li>
        )
        })
      }
    </ul>
    )
    }
     
	render(){
		console.log('this.props',this.props);
	return(
	<div className="App">
	  <div className="title">
	  Reminder Pro       
	  </div>     
	  <div className="form-inline reminder-form">
		  <div className="form-group">
		    <input className="form-control" onChange={ event => this.setState({text: event.target.value})} placeholder="I have to ..." />

		    <input className="form-control" type="datetime-local" onChange={ event => this.setState({dueDate: event.target.value})} placeholder="This is dueDate ..."  />	       
		   </div> 



<button type="button" onClick={() => {this.addReminder()}} className="btn btn-success">
             Add Reminder
		   </button>
 	   </div>  
{this.renderReminders()} 
      <div className="btn btn-danger" onClick={()=> this.props.clearReminders()}>  
         Clear Reminders
      </div>  

	</div>         
	)
	}
};



//function mapDispatchToProps(dispatch){
//	return bindActionCreators({addReminder}, dispatch);
//};


function mapStateToProps(state){
	return{
	reminders: state
	}
};


//export default connect(null,mapDispatchToProps)(App);
export default connect(mapStateToProps,{addReminder,deleteReminder,clearReminders})(App);