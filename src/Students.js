import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Students = (props) => {
    console.log(props)
    return (
        <div>
            <h2>Students</h2>
            <ul>
                {props.students.map(student => (
                    <Link to={`/students/${student.id}`} key={student.id} ><li>{student.firstName} {student.lastName}</li></Link>
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
