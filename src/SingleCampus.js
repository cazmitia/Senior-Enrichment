import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const SingleCampus = (props) => {
    const currentCampus = props.campuses.find(campus => campus.id === props.match.params.id * 1) || {};
    const campusStudents = props.students.filter(student => student.campusId === props.match.params.id * 1) || []
    console.log(currentCampus.name)
    return (
        <div>
        <h1>{currentCampus.name}</h1>
        <h6>{currentCampus.address}</h6>
        <img src={currentCampus.imageUrl} />
        <div>
            {currentCampus.description}
        </div>
        <ul>
            <h1>Student Directory:</h1>
            {campusStudents.map(student => (
                <Link to={`/students/${student.id}`} key={student.id} ><li>{student.firstName} {student.lastName}</li></Link>
            ))}
        </ul>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

export default connect(mapStateToProps)(SingleCampus)
