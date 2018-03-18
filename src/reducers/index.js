import { ADD_REMINDER,DELETE_REMINDER,CLEAR_REMINDER }  from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';

const reminder = (action) => {
	let {text,dueDate} = action;
	return {
		id: Math.random(),
		text,
		dueDate
	}
}

const removeById=(state =[], id) => {
	const reminders = state.filter(reminder => reminder.id != id);
	console.log('new reduce reminders', reminders);
	return reminders;
}

const reminders =(state = [], action) => {
	let reminders = null;
	state= read_cookie('reminders');
	switch(action.type){

//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC		
		case ADD_REMINDER:
		reminders = [...state, reminder(action)];
		console.log('reminder as state AAA', reminders);
		bake_cookie('reminders',reminders);
		return reminders;
//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
		case DELETE_REMINDER:
		reminders = removeById(state, action.id);
		bake_cookie('reminders',reminders);
		return reminders;

//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
		case CLEAR_REMINDER:
		reminders = [];
		bake_cookie('reminders',reminders);
		return reminders;
//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC



		default:
		return state;
	}
}
export default reminders;