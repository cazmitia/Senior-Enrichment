import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCampus } from './store'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import DeleteSharp from '@material-ui/icons/DeleteSharp'

class Campuses extends Component {

    render() {
        const { campuses } = this.props
        return (
            // <div >
                <Grid container spacing={24} style={{ padding: 24, marginTop: '60px' }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Button style={{ width: '33%' }} variant='contained' color='primary' component={Link} to='/campuses/add' ><DeleteSharp size='large' />Add a Campus</Button>
                    </Grid>
                    {campuses.map(campus => (
                        <Grid item xs={12} sm={6} lg={4} xl={3} key={campus.id}>
                            <Card >
                                <CardMedia component={Link} to={`/campuses/${campus.id}`} image={campus.imageUrl} style={{ height: 0, paddingTop: '80%' }} />
                                <CardContent component={Link} to={`/campuses/${campus.id}`} >
                                    <Typography variant='title' color='textPrimary' component='h4' style={{ textAlign: 'center' }}>
                                        {campus.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant='contained' size='small' color='secondary' onClick={() => this.props.deleteCampus(campus.id)} ><DeleteSharp />Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            // </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteCampus: campusId => dispatch(deleteCampus(campusId))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)
