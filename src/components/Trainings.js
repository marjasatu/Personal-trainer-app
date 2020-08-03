import React, {useState, useEffect} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import moment from 'moment';


export default function Trainings(props) {

    const [open, setOpen] = useState(false)
    const [trainings, setTrainings] = useState([])


    const handleClickOpen = () => {
        setOpen(true)
        fetch(props.customer.links[2].href)
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const handleClose = () => {
        setOpen(false)
    }
    

    const columns = [
        {
           Header: 'Date',
           accessor: 'date',
           Cell: row => moment(row.value).format('MMMM Do YYYY') 
        },
        {
           Header: 'Duration (min)',
           accessor: 'duration' 
        },
        {
            Header: 'Activity',
            accessor: 'activity' 
         },
    ]


    return ( 
        <div>
        <Button color="primary" onClick={handleClickOpen}>
          Trainings
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{'Trainings - ' + props.customer.firstname + " " + props.customer.lastname}</DialogTitle>
                <DialogContent>
                    <ReactTable filterable={true} pageSize={10} data={trainings} columns={columns}/>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>    
    </div>
    )
}