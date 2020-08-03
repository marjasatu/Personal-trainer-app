import React, {useState, useEffect} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Trainings from './Trainings'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Collapse from '@material-ui/core/Collapse';

export default function Customers() {
    
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false);
    
    useEffect(() => fetchData(), [])
    
    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

   const columns = [
      
      {
         Header: 'Firstname',
         accessor: 'firstname'
      },
      {
         Header: 'Lastname',
         accessor: 'lastname' 
      },
      {
         Header: 'Streetaddress',
         accessor: 'streetaddress' 
      },
      {
         Header: 'Postcode',
         accessor: 'postcode' 
      },
      {
         Header: 'City',
            accessor: 'city' 
      },
      {
         Header: 'Email',
         accessor: 'email' 
      },
      {
         Header: 'Phone',
         accessor: 'phone' 
      },
      {
         sortable: false,
         filterable: false,
         width: 100,
         Cell: row => <Trainings customer={row.original} /> 
      },        
    ]

    return ( 
        <div>
            <ReactTable filterable={true} data={customers} columns={columns}/>
        </div>
    )
}