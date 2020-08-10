import React, {useState} from 'react'
import { forwardRef } from 'react';
import 'react-table/react-table.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



export default function Trainings(props) {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }

    const [open, setOpen] = useState(false)
    const [trainings, setTrainings] = useState([])

    const fetchData = () => {
        fetch(props.customer.links[2].href)
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const handleClickOpen = () => {
        console.log(props.customer)
        setOpen(true)
        fetchData()
    }

    const handleClose = () => {
        setOpen(false)
    }
    

    const columns = [
        {
           title: 'Date',
           field: 'date',
           render: rowData => moment(rowData.date).format('MMMM Do YYYY')            
        },
        {
           title: 'Duration (min)',
           field: 'duration' 
        },
        {
            title: 'Activity',
            field: 'activity' 
         },
    ]

    const saveTraining = (training) => {
        console.log(training)
        console.log(props.customer)
        fetch("https://customerrest.herokuapp.com/api/trainings/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "date":  moment(training.date).toISOString(),
                "activity": training.activity,
                "duration": training.duration,
                "customer": props.customer.links[0].href
            })
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
      }
      
  
     const updateTraining = (newData, row) => {
        fetch(row.links[0].href, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "date":  moment(newData.date).toISOString(),
                "activity": newData.activity,
                "duration": newData.duration,
                "customer": props.customer.links[0].href
            })
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        
     }  
  
     const deleteTraining = (row) => {
        fetch(row.links[0].href, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
     }
  


    return ( 
        <div>
        <Button color="primary" onClick={handleClickOpen}>
          Trainings
        </Button>
        <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Trainings</DialogTitle>
            <DialogContent>
                <MaterialTable 
                    emptyRowsWhenPaging={false} 
                    icons={tableIcons} 
                    title={props.customer.firstname + " " + props.customer.lastname} 
                    filterable={true} 
                    fullWidth={true}
                    data={trainings} 
                    columns={columns}
                    editable={{
                        onRowAdd: (newData) =>
                           new Promise((resolve) => {
                              setTimeout(() => {
                                 saveTraining(newData)
                                 resolve();
                              }, 500)
                           }),
                        onRowUpdate: (newData, rowData) => 
                           new Promise((resolve) => {
                              setTimeout(() => {
                                 updateTraining(newData, rowData)
                                 resolve();
                              }, 500)
                       }),
                        onRowDelete: (rowData) => 
                            new Promise((resolve) => {
                            setTimeout(() => {
                                deleteTraining(rowData)
                                resolve();
                            }, 500)
                        }),
                     }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>    
    </div>
    )
}