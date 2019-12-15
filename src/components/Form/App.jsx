import React, { Component } from "react";
import "./state.css";
import Header from "./Header";
import SubHeader from "./SubHeader";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

class App extends Component {
  state = {
    projects: [
      {
        id: 1,
        title: "Angular eBook",
        phase: "todo",
        completed: false,
        edit: false
      },
      {
        id: 2,
        title: "React eBook",
        phase: "completed",
        completed: true,
        edit: false
      },
      {
        id: 3,
        title: "NodeJS eBook",
        phase: "todo",
        completed: false,
        edit: false
      },
      {
        id: 4,
        title: "Modern JavaScript eBook",
        phase: "inprogress",
        completed: false,
        edit: false
      },
      {
        id: 5,
        title: "Node Microservice",
        phase: "inprogress",
        completed: false,
        edit: false
      }
    ]
  };

  onProjectAdd = project => {
    let maxId = +new Date();
    project.id = maxId;
    project.edit = false;
    project.completed = false;

    let projects = [project, ...this.state.projects];

    this.setState({
      projects
    });
  };

  onToggleEditProject = projectId => {
    let projects = this.state.projects.map(p => {
      if (p.id == projectId) {
        p.edit = !p.edit;
      }
      return p;
    });
    this.setState({
      projects
    });
  };

  onUpdate = (id, project) => {
    let projects = this.state.projects.map(p => {
      if (p.id == id) {
        p.edit = !p.edit;
        p.title = project.title;
        p.phase = project.phase;
      }
      return p;
    });

    this.setState({
      projects
    });
  };

  onDeleteProject = (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      let projects = this.state.projects.filter(p => {
        return p.id != id;
      });

      this.setState({
        projects
      });
    }
  };

  onMarkCompleted = projectId => {
    let projects = this.state.projects.map(p => {
      if (p.id === projectId) {
        p.completed = !p.completed;
      }
      return p;
    });
    this.setState({
      projects
    });
  };

  render() {
    return (
      <div>
        <Header title="Project Management App">
          <SubHeader color="red" title="(Kanban based system)" />
        </Header>
        <hr />
        <ProjectForm onProjectAdd={this.onProjectAdd} />
        <ProjectList
          projects={this.state.projects}
          onEdit={this.onToggleEditProject}
          onUpdate={this.onUpdate}
          onCancel={this.onToggleEditProject}
          onDelete={this.onDeleteProject}
          onMarkCompleted={this.onMarkCompleted}
        />
      </div>
    );
  }
}

export default App;
