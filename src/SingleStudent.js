import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const SingleStudent = (props) => {
    const currentStudent = props.students.find(student => student.id === props.match.params.id * 1) || {}
    const studentCampus = props.campuses.find(campus => campus.id === currentStudent.campusId) || null
    return (
        <Card style={{ maxWidth: '800', margin: 'auto', marginTop: '60px' }}>
            <CardHeader style={{ textAlign: 'center' }} title={currentStudent.firstName + ' ' + currentStudent.lastName} />
            <CardMedia image={currentStudent.imageUrl} style={{ height: 0, paddingTop: '80%' }} />
            <CardContent>
                <Typography style={{ textAlign: 'center' }} >{currentStudent.email}</Typography>
                <Typography component='p'>G.P.A: {currentStudent.gpa}</Typography>
                <Typography component={Link} to={`/campuses/${studentCampus ? studentCampus.id : ''}`}>Campus: {studentCampus ? studentCampus.name : 'Not currently enrolled'}</Typography>

            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

export default connect(mapStateToProps)(SingleStudent)
