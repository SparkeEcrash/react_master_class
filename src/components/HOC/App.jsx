import React from "react";
//HOC
const withBorder = (WrappedComponent, Mode) => {
	console.log(WrappedComponent);
	console.log(Mode);

	let style = {};
	let data = {};

	if(Mode === "YouTube") {
		style = {
			border: "2px solid red",
			padding: "10px"
		}
		data = {
			title: "YouTube"
		}
	} else {
		style = {
			border: "2px solid blue",
			padding: "10px"
		}
		data = {
			title: "Other"
		}
	}

  class _WithBorder extends React.Component {
    render() {
			return (
      <div style={style}>
				{/* ordering {...this.props} first ensures that it gets overwritten with props afterwards */}
        <WrappedComponent {...this.props} title="title was overwritten with HOC" style={style} data={data}></WrappedComponent>
			</div>
			)
    }
	};
	_WithBorder.displayName = "WithBorder";
	return _WithBorder;
};

const withCollapsible = WrappedComponent => {
	const wrapStyle = {
		width: "80%",
		minHeight: "21px",
		position: "relative",
		backgroundColor: "yellow"
	}
	const minHandlerStyle = {
		width: "20px",
		height: "20px",
		backgroundColor: "red",
		position: "absolute",
		right: 0
	}
	const titleStyle = {
		position: "absolute",
		left: 0,
		paddingLeft: "5px"
	}

	class _WithCollapsible extends React.Component {
		state = {
			show: true
		}

		toggleMinMax = () => {
			this.setState({
				show: !this.state.show
			})
		}

		render() {
			let title = this.props.title || "click to maximize";
			return (
				<div style={wrapStyle}>
					{!this.state.show && <div style={titleStyle}>{title}</div>}
					<div onClick={this.toggleMinMax} style={minHandlerStyle}></div>
						<WrappedComponent {...this.props} {...this.state}/>
				</div>
			)
		}
	}
	_WithCollapsible.displayName = "__WithCollapsible";
	return _WithCollapsible;
}

////////////////////////////////////////////////////

//WRAPPED COMPONENT
class App extends React.Component {
	state = {title: "something"}
  render() {
		let style = {
			display: this.props.show ? "block" : "none"
		}
    return (
      <div style={style}>
        <h2>Higher Order Component</h2>
        {this.props.title}
      </div>
    );
  }
}

export default withCollapsible(withBorder(App, "YouTube"));
// export default withBorder(App, "Nintendo");
