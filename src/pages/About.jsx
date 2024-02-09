
import React from 'react'


import DataTable from 'react-data-table-component';



// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
  { name: 'ID' , width:'10%' , selector: row => row.id,},
  { name: 'Title', width:'10%', selector: row => row.title, },
  {  name: 'Name', width:'40%' ,sortable: true, selector: row => row.name},
  {  name: 'Last Name', width:'15%' , selector: row => row.lastname},
  {  name: 'Education', width:'15%', selector: row => row.eduction },
  {  name: 'Age', width:'5%' , selector: row => row.age },

];

const rows = [
  { id: 0, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 1, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 3, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 4, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 5, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 6, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 7, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 8, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 9, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 10, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 11, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 12, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 13, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 14, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 15, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 16, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 17, title: 'Example' ,name:"chandresdsfdfh",lastname:"patel",eduction:"be civil",age:35},
  { id: 18, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 19, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 20, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 21, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 22, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 23, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 24, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 25, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 26, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 27, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 28, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 29, title: 'Example' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  { id: 30, title: 'Demo' ,name:"chandresh",lastname:"patel",eduction:"be civil",age:35},
  

  
];




function About() {
  
  
  return (
    <div >
       <DataTable title="chandresh" columns={columns} data={rows}  pagination  selectableRows responsive striped  dense paginationPerPage={20} />
      
    </div>
  )
}

export default About
