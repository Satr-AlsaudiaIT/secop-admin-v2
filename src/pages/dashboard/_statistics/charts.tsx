
import { useQuery } from '@tanstack/react-query';
import { Chart, Interval, Tooltip, Line, Point, registerTheme, Interaction, LineAdvance } from 'bizcharts';
import { useSelector } from 'react-redux';
import axios from 'utlis/library/helpers/axios';




import {  theme } from "antd";
import { FormattedMessage } from 'react-intl';


export default function Charts({data}) {
  const { token } = theme.useToken();
console.log({data,cd:"cd"})
  const style={
    backgroundColor: token.colorBgContainer,
    color:token.colorText
  }
const orderPrice = Object.entries(data?.total_per_month??{}).map(([key,value])=>({month:key,price:value }))
  return (
    <div className='box-border flex w-full gap-4 flex-col md:flex-row ' >
      {/* <div style={style} className='box-border w-full px-3 rounded-lg'>
      <h3>Orders count</h3>
    


      <Chart height={400} autoFit data={orderCount}   padding={[30, 30, 30, 50]} >
    <Interval  position="month*orderCount"  />
    <Interaction type="element-highlight" />
				<Interaction type="active-region" />
    <Tooltip shared />
  </Chart>



      </div> */}
      <div style={style} className='box-content w-full   px-3 rounded-lg'>

      <h3><FormattedMessage id='total-price-per-month' /></h3>
      {/* <Chart height={400}  autoFit data={orderPrice} appendPadding={[20, 0, 0, 0]}>
        <Line position="month*price" shape="smooth" />
        <Point position="month*price" />
        <Tooltip showCrosshairs />
      </Chart> */}
      <div className='h-[calc(100vh_-_373px)]'>

      <Chart padding={[10, 20, 50, 40]} autoFit  data={orderPrice} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="month*price"
		/>
	
	</Chart>
      </div>
      </div>

    </div>
  )
}
