import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import App from '../App';
const data = [
  { name: 'Alimentação', value: 400 },
  { name: 'Fixos', value: 300 },
  { name: 'Lazer', value: 300 },
  { name: 'Outros', value: 200 },
];

const COLORS = ['#7031AC', '#3C9D4E', '#0088FE', '#000000'];

export default class Example extends PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '10px',}}>
        <PieChart width={700} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />
        </PieChart>
      </div>
    );
  }
}
