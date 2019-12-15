import React, { Component } from 'react'
import "./DyanmicForm.css";

export class DynamicForm extends Component {
	state = {};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.defaultValues && nextProps.defaultValues.id !== prevState.id) {
			return {
				...nextProps.defaultValues
			};
		}
		return null;
	}

	onSubmit = (e) => {
		e.preventDefault();
		if(this.props.onSubmit) this.props.onSubmit(this.state);
	}

	onChange = (e, key, type="single") => {
		if (type === "single") {
			this.setState({
				//"this" in the line below is referring to the form and not the state component
				[key]: e.target.value
			})
		} else {
			let found = this.state[key] ? this.state[key].find((d) => d === e.target.value) : false;
			if (found) {
				let data = this.state[key].filter((d) => {
					return d !== found;
				})
				this.setState({
					[key]: data
				});
			} else {
				let existing = this.state[key];
				let data = [e.target.value];
				if (existing) {
					data = [e.target.value, ...existing]
				} 
				this.setState({
					[key] : data
				});
			}
		}
	}

	renderForm = () => {
		let model = this.props.model;
		
		let formUI = model.map((m) => {
			let key = m.key;
			let type = m.type || "text";
			let props = m.props || {};
			let name = m.name;

			let target = key;

			let value = this.state[target];

			let input = <input {...props} 
						className="form-input"
						type={type}
						key={m.key}
						name={name}
						value={value}
						onChange={(e)=>{this.onChange(e, target)}}
			/>;

			if (type ==="radio") {
				input = m.options.map((o) => (
					<React.Fragment key={o.key}>
						<input {...props} className="form-input" type={type} key={o.key} name={o.name} value={o.value} onChange={(e)=>{this.onChange(e, o.name)}} />
						<label key={"ll" + o.key}>{o.label}</label>
					</React.Fragment>
				));
				input = <div className = "form-group-radio">{input}</div>
			}

			if (type === "select") {
				input = m.options.map((o) => {
					return (
						<option {...props} className="form-input" key={o.key} name={o.name} value={o.value}>{o.value}</option>
					);
				});
				input = (
					<select value={value} defaultValue={null} onChange={(e) => this.onChange(e, m.key)}>
						<option {...props} className="form-input" key={null} value={null}></option>
						{input}
					</select>
				)
			}

			if (type === "checkbox") {
				input = m.options.map((o) => {
					let checked = false;
					if (value && value.length > 0) {
						checked = value.indexOf(o.value) > -1 ? true : false;
					} 
					return (
						<React.Fragment key={"cfr" + o.key}>
							<input {...props} className="form-input" type={type} key={o.key} name={o.name} checked={checked} value={o.value} onChange={(e) => this.onChange(e, m.key, "multiple")}/>
							<label key={"ll" + o.key}>{o.label}</label>
						</React.Fragment>
					);
				});
				input = <div className="form-group-checkbox">{input}</div>
			}

			return (
				<div key={key} className="form-group">
					<label className="form-label" key={"l" + m.key} htmlFor={m.key}>
						{m.label}
					</label>
					{input}
				</div>
			);
		});
		return formUI;
	}

	render() {
		let title = this.props.title || "Dynamic Form";

		return (
			<div className={this.props.className}>
				<h3 className="form-title">{title}</h3>
				<form className="dynamic-form" onSubmit={(e)=>{this.onSubmit(e)}}>
					{this.renderForm()}
					<div className="form-actions">
						<button type="submit">submit</button>
					</div>
				</form>
			</div>
		)
	}
}

export default DynamicForm
