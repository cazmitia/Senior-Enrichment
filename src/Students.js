import React from 'react'
import {connect} from 'react-redux'

const Students = (props) => {
    console.log(props)
    return (
        <div>
            <h2>Students</h2>
            <ul>
                {props.students.map(student => (
                    <li key={student.id}>{student.firstName} {student.lastName}</li>
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

export default connect(mapStateToProps)(Students)
