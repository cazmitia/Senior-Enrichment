import React, {Component} from 'react'
import {addNewCampus, addNewStudent} from './store'
import {connect} from 'react-redux'

class AddForm extends Component {
    constructor(props) {
        super(props)
        this.state = props.location.pathname === '/campuses/add' ? {
            name: '',
            address: ''
        } :
        {
            firstName: '',
            lastName: '',
            email: ''
        }
    }
    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
        // console.log(this.state)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const addFunc = this.state.name ? this.props.addCampus : this.props.addStudent
        //this.props.addCampus(this.state)
        addFunc(this.state)
        .then(() => this.props.history.push(this.state.name ? '/campuses' : '/students'))
    }
    render() {
        // console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                {Object.keys(this.state).map(key => (
                    <div key={key}>
                        <label>{key === 'firstName' ? 'FIRST NAME' : key === 'lastName' ? 'LAST NAME' : key.toUpperCase()}: </label>
                        <input type='text' name={key} value={this.state[key]} onChange={this.handleChange} />
                    </div>
                ))}
                <button type='submit'>Add</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        addCampus: (campus) => dispatch(addNewCampus(campus)),
        addStudent: (student) => dispatch(addNewStudent(student))
    }
)

export default connect(null, mapDispatchToProps)(AddForm)
