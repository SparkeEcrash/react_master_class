import React from 'react';
import {Container} from './Restated';

export class TimeProvider extends Container {
	state = {
		time: new Date()
	}
	render () {
		//console.log("Render about the parent render that is linked with "extends Container")
		return super.render();
	}
}

export class MyProvider extends Container {
  state = {
    tasks: [
      { id: 1, title: "New React Context API" },
      { id: 2, title: "Learn VueJS" },
      { id: 3, title: "Master NodeJS" }
		],
		notifications: [
			{taskId: 1, message: "Message 1 TaskID 1"},
			{taskId: 1, message: "Message 2 TaskID 1"},
			{taskId: 2, message: "Message 1 for TaskID 2"}
		]
	};
	
	actions = {
		onAddTask: title => {
			//always get the highest id value amongst the entries in state.task
			let maxId = Math.max.apply(Math, this.state.tasks.map((task)=>{return task.id}));
			let task = {
				id: maxId + 1,
				title: title
			};
	
			this.setState({
				tasks: [task, ...this.state.tasks]
			});
		},
		onDeleteTask: taskId => {
			let tasks = this.state.tasks.filter(task => {
				return task.id !== taskId;
			});
	
			this.setState({
				tasks
			});
		}
	}
  render() {
		//console.log("Render about the parent render that is linked with "extends Container")
    return super.render();
  }
}