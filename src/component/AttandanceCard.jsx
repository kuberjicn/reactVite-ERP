import React from 'react'

function AttandanceCard({fhtype,shtype,supname='xyz',intime='00.00.00',outtime='00.00.00'}) {
 
  return (
    <>
    
      <div className='card-header'>
     
                <h3 >{supname}</h3>
            
        <div className='att'>
        <div className="card-attandance " >
            <div className='att-header'>
                <h3 >Morning</h3>
            </div>
            <div className= {`pbtn text-center  ${ fhtype===1 ? 'pbtn-holiday' :fhtype===2 ? 'pbtn-absent' : fhtype===3 ? 'pbtn-present' : fhtype===4 ? 'pbtn-casual' : fhtype===5 && 'pbtn-sick' } `} onClick={()=>alert('dd')}>
              {fhtype===1 ? 'H':fhtype===2?'A':fhtype===3?'P':fhtype===4?'L':fhtype===5&&'S'}
            </div>
        </div>
        <div className="card-attandance " >
            <div className='att-header'>
                <h3 >Evening</h3>
            </div>
            <div className= {` text-center pbtn ${ shtype===1 ? 'pbtn-holiday' :shtype===2 ? 'pbtn-absent' : shtype===3 ? 'pbtn-present' : shtype===4 ? 'pbtn-casual' : shtype===5 && 'pbtn-sick' } `} onClick={()=>alert('dd')}>
            {shtype===1 ? 'H':shtype===2?'A':shtype===3?'P':shtype===4?'L':shtype===5&&'S'}
            </div>
        </div>
      </div>
      <div className='card-footer'>
        <div className='disp-time'><span>intime :</span>{intime}</div>
        <div className='disp-time'><span>outtime:</span>{outtime}</div>
      </div>
      </div>
    </>
  )
}

export default AttandanceCard
