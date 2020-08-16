import React, {useState, useEffect} from 'react'
import 'react-table/react-table.css'
import Trainings from './Trainings'
import { forwardRef } from 'react';
import 'react-table/react-table.css'
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


export default function Customers() {

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
    
    const [customers, setCustomers] = useState([])
    const columns = [
      {
         title: 'Firstname',
         field: 'firstname',
         type: 'string' 
      },
      {
         title: 'Lastname',
         field: 'lastname',
         type: 'string' 
      },
      {
         title: 'Streetaddress',
         field: 'streetaddress',
         type: 'string' 
      },
      {
         title: 'Postcode',
         field: 'postcode',
         type: 'string' 
      },
      {
         title: 'City',
         field: 'city',
         type: 'string' 
      },
      {
         title: 'Email',
         field: 'email' 
      },
      {
         title: 'Phone',
         field: 'phone' 
      },
      {
         render: rowData => <Trainings customer={rowData} /> 
      }, 
      
    ]
    
    useEffect(() => fetchData(), [])
    
    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
      fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    

   const updateCustomer = (newData, row) => {
      fetch(row.links[0].href, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(newData)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
   }  

   const deleteCustomer = (row) => {
      fetch(row.links[0].href, {method: 'DELETE'})
      .then(res => fetchData())
      .catch(err => console.error(err))
   }


    return ( 
        <div>
            <MaterialTable  
               title= {<h1 style={{textAlign: "left"}} >Customers </h1>}
               options={{pageSize: 20, addRowPosition:'first'}}
               icons={tableIcons}
               filterable={true}
               data={customers}
               columns={columns}
               
               
               editable={{
                  onRowAdd: (newData) =>
                     new Promise((resolve) => {
                        setTimeout(() => {
                           saveCustomer(newData)
                           resolve();
                        }, 500)
                     }),
                  onRowUpdate: (newData, rowData) => 
                     new Promise((resolve) => {
                        setTimeout(() => {
                           updateCustomer(newData, rowData)
                           resolve();
                        }, 500)
                 }),
                  onRowDelete: (rowData) => 
                  new Promise((resolve) => {
                     setTimeout(() => {
                        deleteCustomer(rowData)
                        resolve();
                     }, 500)
                   }),
               }}
               
            />
        </div>

        
    )
}