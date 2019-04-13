import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const SingleStudent = (props) => {
    const currentStudent = props.students.find(student => student.id === props.match.params.id * 1) || {}
    const studentCampus = props.campuses.find(campus => campus.id === currentStudent.campusId) || null
    return (
        <div>
            <h4>{currentStudent.firstName} {currentStudent.lastName}</h4>
            <h6>{currentStudent.email}</h6>
            <img src={currentStudent.imageUrl} />
            <div>GPA: {currentStudent.campusId ? currentStudent.gpa : 'n/a'}</div>
            <div>School: {studentCampus ? <Link to={`/campuses/${studentCampus.id}`}> {studentCampus.name} </Link> : 'Not currently enrolled'}</div>

        </div>
    )
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

export default connect(mapStateToProps)(SingleStudent)
