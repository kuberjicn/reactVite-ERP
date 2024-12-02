import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label,LabelList } from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    
    const { total_qty,mat_unit } = payload[0].payload;
    
    
    
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", border: "1px solid #ccc",fontSize:'12px' }}>
        <p style={{marginBottom:'3px',backgroundColor:'#dadada',padding:'2px',borderBottom:'1px solid #9caea9',textTransform:'uppercase',fontWeight:'bold'}}className="label" >{label}</p>
        <p style={{marginBottom:'0',paddingLeft:'7px'}}>{`Qty: ${total_qty.toLocaleString()} ${mat_unit} `}</p>
        
      </div>
    );
  }

  return null;
};



const QtyBarChart = ({data,xname,yname}) => {

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }
  
  const processedData = data.map(item => ({
    ...item,
    total_qty: parseFloat(item.total_qty)
  }));

  // Get the maximum value from the data for Y-axis range
  const maxTotalQty = Math.max(...processedData.map(item => item.total_qty))
  //console.log(maxTotalQty)
  return (
    <ResponsiveContainer width="100%" height={370}>
      <BarChart
        data={processedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xname}
        angle={-45} 
        position="insideRight"
        tick={{ fontSize: 12, fill: '#333',textAnchor: 'end' }}
         />
        <YAxis  tick={{ fontSize: 12, fill: '#333' }} 
          domain={[0, maxTotalQty * 1.1]} 
          allowDecimals={false} 
          tickCount={8} >
          </YAxis> 
        <Tooltip content={<CustomTooltip/>} />
       
        <Bar dataKey={yname} fill="#8884d8" >
        
        <LabelList dataKey={'total_qty'} position="top" style={{ fontSize: 12, fill: '#555' }} />
        </Bar>
        
        
      </BarChart>
    </ResponsiveContainer>
  );
};

export default QtyBarChart;
