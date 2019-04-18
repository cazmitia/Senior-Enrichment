import React, { Component } from 'react'
import { addNewCampus, addNewStudent } from './store'
import { connect } from 'react-redux'
import { TextField, Paper, Button } from '@material-ui/core';

class AddForm extends Component {
    constructor(props) {
        super(props)
        this.state = props.location.pathname.includes('campuses') ? {
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
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const addFunc = this.props.location.pathname.includes('campuses') ? this.props.addCampus : this.props.addStudent
        addFunc(this.state)
            .then(() => this.props.history.push(this.props.location.pathname.includes('campuses') ? '/campuses' : '/students'))
    }
    render() {
        return (
            <Paper style={{ margin: 'auto', maxWidth: '500px' }}>
                <form onSubmit={this.handleSubmit} style={{ marginTop: '60px', padding: '5%' }}>
                    {Object.keys(this.state).map(key => (
                        <TextField
                            // style={{ margin: 'normal' }}
                            key={key}
                            fullWidth={true}
                            name={key}
                            value={this.state[key]}
                            onChange={this.handleChange}
                            label={key === 'firstName' ? 'FIRST NAME' : key === 'lastName' ? 'LAST NAME' : key.toUpperCase()}
                            required={true}
                        />
                    ))} 
                    <Button
                        variaint='contained' type='submit' color='primary' >Add</Button>
                </form>
            </Paper>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        addCampus: (campus) => dispatch(addNewCampus(campus)),
        addStudent: (student) => dispatch(addNewStudent(student))
    }
)

const mapStateToProps = (state) => (
    {
        campuses: state.campuses
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)
