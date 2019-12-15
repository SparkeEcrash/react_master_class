import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ProjectForm extends Component {
  static propTypes = {
    onProjectAdd: PropTypes.func.isRequired
  };
  addProject = event => {
    event.preventDefault();
    let newProject = {
      title: this.title.value,
      phase: this.phase.value
    };
    this.props.onProjectAdd(newProject);
  };
  render() {
    return (
      <form className="project-form" onSubmit={this.addProject}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            ref={title => {
              this.title = title;
            }}
          />
        </div>
        <div>
          <label>Phase: </label>
          <select
            ref={phase => {
              this.phase = phase;
            }}
          >
            <option value="todo">todo</option>
            <option value="inprogress">in-progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    );
  }
}
