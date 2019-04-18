import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Students from './Students'

const SingleCampus = (props) => {
    const currentCampus = props.campuses.find(campus => campus.id === props.match.params.id * 1) || {};
    console.log(props)
    return (
        <Fragment>
            <Card style={{ maxWidth: '800', margin: 'auto', marginTop: '60px' }}>
                <CardHeader style={{ textAlign: 'center' }} title={currentCampus.name} />
                <CardMedia image={currentCampus.imageUrl} style={{ height: 0, paddingTop: '80%' }} />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} >{currentCampus.address}</Typography>
                    <Typography component='p'>{currentCampus.description}</Typography>
                </CardContent>
            </Card>
            <Students campusId={currentCampus.id} />
        </Fragment>
    )
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

export default connect(mapStateToProps)(SingleCampus)
