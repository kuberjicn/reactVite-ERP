import React from "react";
import {  LineChart,  Line,  CartesianGrid,  XAxis,  YAxis,  Tooltip,  Legend,  ResponsiveContainer,ReferenceLine} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { total_unskill, total_skill, total_workers } = payload[0].payload;

    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", border: "1px solid #ccc",fontSize:'12px' }}>
        <p style={{marginBottom:'3px',backgroundColor:'#dadada',padding:'2px',borderBottom:'1px solid #9caea9'}}className="label">{`Date: ${new Date(label).toLocaleDateString("en-IN").replace(/\//g, "-")}`}</p>
        <p style={{marginBottom:'0',paddingLeft:'7px'}}>{`Unskill: ${total_unskill.toLocaleString()}`}</p>
        <p style={{marginBottom:'0',paddingLeft:'7px'}}>{`Skill: ${total_skill.toLocaleString()}`}</p>
        <p style={{marginBottom:'0',paddingLeft:'7px'}}>{`Workers: ${total_workers.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLabel = ({ viewBox, value }) => {
  const { x, y,width } = viewBox;
  return (
    <text x={x + width / 2} y={y} dy={-10} fill="#333" fontSize={14} fontWeight={700} textAnchor="middle">
      {value}
    </text>
  );
};
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function LabourChart({ data }) {
  const totalWorkersAverage =
  data.reduce((sum, item) => sum + item.total_workers, 0) / data.length;
  const totalskillAverage =
  data.reduce((sum, item) => sum + item.total_skill, 0) / data.length;
  const totalunskillAverage =
  data.reduce((sum, item) => sum + item.total_unskill, 0) / data.length;
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ddate" 
        tickFormatter={(date) => formatDate(date)} 
        tick={{ fontSize: 12, fill: '#888' }}/>
        <YAxis  tick={{ fontSize: 12, fill: '#888' }} />
        <Tooltip content={<CustomTooltip />} />
{/* <Tooltip formatter={(value) => value.toLocaleString()} /> */}
        {/* <Legend /> */}
        <Line type="monotone" dataKey="total_unskill" stroke="#8884d8" />
        <Line type="monotone" dataKey="total_skill" stroke="#82ca9d" />
        <Line type="monotone" dataKey="total_workers" stroke="#EC6D34" />
       
        <ReferenceLine
          y={totalWorkersAverage}
          fontWeight={700}
          label={<CustomLabel value={`Avg Workers (${totalWorkersAverage.toFixed(2)})`} viewBox={50}/>}
          stroke="#EC6D34"
          strokeDasharray=" 0 0 "
          strokeWidth={1.5}
        />
        <ReferenceLine
          y={totalskillAverage}
          fontWeight={700}
          label={<CustomLabel value={`Avg skill (${totalskillAverage.toFixed(2)})`} viewBox={50}/>}
          stroke="#82ca9d"
          strokeDasharray=" 0 0 "
          strokeWidth={1.5}
        />
        <ReferenceLine
          y={totalunskillAverage}
          fontWeight={700}
          label={<CustomLabel value={`Avg unskill (${totalunskillAverage.toFixed(2)})`} viewBox={50}/>}
          stroke="#8884d8"
          strokeDasharray=" 0 0 "
          strokeWidth={1.5}
        />

       

      </LineChart>
    </ResponsiveContainer>
  );
}

export default LabourChart;