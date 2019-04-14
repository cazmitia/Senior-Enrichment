import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteStudent} from './store'

const Students = (props) => {
    console.log(props)
    return (
        <div>
            <h2 style={{display: 'inline'}} >Students</h2> <Link to='/students/add' >Add New Student</Link>
            <ul>
                {props.students.map(student => (
                    <li key={student.id} >
                        <Link to={`/students/${student.id}`} >{student.firstName} {student.lastName}</Link>
                        <button type='button' onClick={() => props.deleteStudent(student.id)} >Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        students: state.students
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteStudent: studentId => dispatch(deleteStudent(studentId))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(Students)
