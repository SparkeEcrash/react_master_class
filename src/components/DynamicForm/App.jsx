import React, { Component } from "react";
import "./App.css";
import DynamicForm from "./DynamicForm";

class App extends Component {
  state = {
    data: [
      { id: 1, name: "a", age: 29, qualification: "B.Com", rating: 3, gender: "male", city: "Kerala", skills: ["reactjs", "angular", "vuejs"] },
      { id: 2, name: "b", age: 35, qualification: "B.Sc", rating: 5, gender: "female", city: "Mumbai", skills: ["reactjs", "angular"] },
      { id: 3, name: "c", age: 42, qualification: "B.E", rating: 3, gender: "female", city: "Bangalore", skills: ["reactjs"] }
    ]
  };

  onSubmit = model => {
		let data = [...this.state.data];
		if (model.id) {
			data = this.state.data.filter((d) => {
				return d.id !== model.id
			});
		} else {
			model.id = +new Date();
		}

		alert(JSON.stringify(model));
    this.setState({
      data: [model, ...data]
    });
	};
	
	onEdit = (id) => {
		let record = this.state.data.find((d) => {
			return d.id === id;
		});
		this.setState({
			currentRecord: record
		});
	}

  render() {
		let data = this.state.data.map((d) => {
			return (
				<tr key={d.id}>
					<td>{d.name}</td>
					<td>{d.age}</td>
					<td>{d.qualification}</td>
					<td>{d.gender}</td>
					<td>{d.rating}</td>
					<td>{d.city}</td>
					<td>{d.skills.join(",")}</td>
					<td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
				</tr>
			)
		})
    return (
      <div className="App">
        <DynamicForm
					key={this.state.currentRecord ? this.state.currentRecord.id : null}
          className="form"
					title="Registration"
					defaultValues={this.state.currentRecord}
          model={[
            { key: "name", label: "Name", props: { required: true } },
            { key: "age", label: "Age", type: "number" },
            { key: "rating", label: "Rating", type: "number", props: { min: 0, max: 5 } },
						{ key: "qualification", label: "Qualification" },
						{ key: "gender", label: "Gender", type: "radio", options: [
							{key: "male", label: "Male", name:"gender", value: "male"},
							{key: "female", label: "Female", name: "gender", value: "female"}
						]},
						{ key: "city", label: "City", type: "select", options: [
							{key: "mumbai", label: "Mumbai", value: "Mumbai"},
							{key: "bangalore", label: "Bangalore", value: "Bangalore"},
							{key: "kerala", label: "Kerala", value: "Kerala"}
						]},
						{ key: "skills", label: "Skills", type: "checkbox", options: [
							{key: "reactjs", label: "ReactJS", value: "reactjs"},
							{key: "angular", label: "Angular", value: "angular"},
							{key: "vuejs", label: "VueJS", value: "vuejs"}
						]}
          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
        <pre style={{ width: "300px" }}>{JSON.stringify(this.state.data)}</pre>
				<table border="1">
					<tbody>
						{data}
					</tbody>
				</table>
      </div>
    );
  }
}

export default App;
