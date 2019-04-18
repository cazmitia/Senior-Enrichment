import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteStudent } from './store'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

const Students = (props) => {
    console.log(props)
    const students = !props.campusId ? props.students :
        props.students.filter(student => student.campusId === props.campusId * 1)
    return (
        <Paper style={{ margin: 'auto', marginTop: '60px', maxWidth: '800' }} >
            <Button
                style={{ margin: '10px' }}
                variant='contained'
                color='primary'
                component={Link} to='/students/add'
            >
                Add New Student
            </Button>
            <List  >
                {students.map(student => (
                    <Fragment key={student.id}>
                        <ListItem button component={Link} to={`/students/${student.id}`} >
                            <ListItemAvatar><Avatar sizes='large' src={student.imageUrl} /></ListItemAvatar>
                            <ListItemText primary={student.firstName + ' ' + student.lastName} />
                            <ListItemSecondaryAction>
                                <Button
                                    style={{ margin: '10px' }}
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => props.deleteStudent(student.id)}
                                >
                                    Delete
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <hr />
                    </Fragment>
                ))}
            </List>
        </Paper>
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
