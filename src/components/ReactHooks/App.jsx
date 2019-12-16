import React, { Component } from "react";
import "./App.css";
import {Consumer} from "./Restated";
import {MyProvider, TimeProvider} from "./Providers";
import Time from "./Time";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="container">
          <h1>Task Management App</h1>
          <TaskApp />
					<Consumer>
						{(context) => (
							<Notification context={context}/>
						)}
					</Consumer>
        </div>
				<TimeProvider>
					<Time/>
				</TimeProvider>
      </MyProvider>
    );
  }
}

const TaskApp = () => (
  <>
    <TaskForm />
    <ul className="task-list">
      <TaskList />
    </ul>
  </>
);

const TaskForm = () => {
  let taskTitle = React.createRef();
  return (
    <Consumer>
      {context => (
        <div>
          <input
            className="input-title"
            ref={taskTitle}
            type="text"
            placeholder="What do you want to do today?"
          />
          <button className="button-add" type="submit" onClick={(e) => context.actions.onAddTask(taskTitle.current.value)}>
            &#x271A;
          </button>
        </div>
      )}
    </Consumer>
  );
};

const TaskList = () => {
  const renderUI = context => {
		console.log(context);
    return context.state.tasks.map(task => {
      return (
        <li className="task-item" key={task.id}>
          <span>{task.title}</span>
          <button
            className="todo-delete-button"
            onClick={e => context.actions.onDeleteTask(task.id)}
          >
            &#x274C;
          </button>
        </li>
      );
    });
  };
  return (
    <Consumer>{context => renderUI(context)}</Consumer>
  );
};

class Notification extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return(this.props.children !== nextProps.children);
	}
	componentDidMount() {
		console.log(this.props.context.state.notifications);
	}
	render() {
		console.log("Notifications->render");
		return (
			<h2>{this.props.children}</h2>
		)
	}
}

export default App;
