
import React from 'react'
import LeaveRow from '../../component/LeaveRow'


function LeaveRegister() {
  const employees=[{"name":"bhavesh vanecha","id":"10","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]}]
  return (
    <div>
      {employees.map((employee)=>
      <LeaveRow data={employee}/>
      )}
      
      
    </div>
  )
}

export default LeaveRegister
