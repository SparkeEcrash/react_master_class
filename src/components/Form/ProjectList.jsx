import React, { Component } from "react";

class ProjectList extends Component {
  state = {
    title: "",
    phase: ""
  };

  constructor(props) {
    super(props);
  }

  onEdit = project => {
    this.setState({
      title: project.title,
      phase: project.phase
    });

    this.props.onEdit(project.id);
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onPhaseChange = e => {
    this.setState({
      phase: e.target.value
    });
  };

  onUpdate = id => {
    console.log(this.state);
    this.props.onUpdate(id, this.state);
  };

  onDelete = (id, title) => {
    this.props.onDelete(id, title);
  };

  onCancel = id => {
    this.props.onCancel(id);
  };

  onEdit = project => {
    this.setState({
      title: project.title,
      phase: project.phase
    });

    this.props.onEdit(project.id);
  };

  editorUI(project) {
    return (
      <React.Fragment>
        <div className="project-content">
          <input
            type="text"
            defaultValue={project.title}
            onChange={this.onTitleChange}
          />

          <select defaultValue={project.phase} onChange={this.onPhaseChange}>
            <option value="todo">todo</option>
            <option value="inprogress">in-progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div className="project-buttons">
          <div>
            <button
              className="button edit"
              onClick={() => this.onUpdate(project.id)}
            >
              save
            </button>
            <button
              className="button cancel"
              onClick={() => this.onCancel(project.id)}
            >
              cancel
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  itemUI(project) {
    let checked = project.completed;
    return (
      <React.Fragment>
        <div className="project-content">
          <span className="title">{project.title}</span>
          <span className="title">{project.phase}</span>
        </div>
        <div className="project-buttons">
          <div>
            <button
              className="button edit"
              onClick={() => this.onEdit(project)}
            >
              edit
            </button>
            <button
              className="button delete"
              onClick={() => this.onDelete(project.id, project.title)}
            >
              delete
            </button>
          </div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => this.props.onMarkCompleted(project.id)}
            />
            mark as complete
          </label>
        </div>
      </React.Fragment>
    );
  }

  render() {
    let { projects } = this.props;
    let projectUI = projects.map(project => {
      let projectItem = project.edit
        ? this.editorUI(project)
        : this.itemUI(project);

      let completeClass = project.completed ? "project-completed" : "";

      return (
        <li className={"project-item " + completeClass} key={project.id}>
          {projectItem}
        </li>
      );
    });
    return <ul className="project-list">{projectUI}</ul>;
  }
}

export default ProjectList;