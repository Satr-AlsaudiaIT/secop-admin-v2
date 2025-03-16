import React from "react";
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	getTheme,
} from "bizcharts";

function Labelline() {
	const data = [
		{ item: "partners", percent: 0.2 },
		{ item: "admins", percent: 0.1 },
		{ item: "users", percent: 0.7 },
	
	];
	const colors = data.reduce((pre, cur, idx) => {
		pre[cur.item] = getTheme().colors10[idx];
		return pre;
	}, {});

	const cols = {
		percent: {
			formatter: (val) => {
				val = val * 100 + "%";
				return val;
			},
		},
	};
	return (
		<Chart height={400} data={data} scale={cols} interactions={['element-active']} autoFit>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
				color="item"
				style={{
					lineWidth: 1,
					stroke: "#fff",
				}}
				label={[
					"item",
					(item) => {
						return {
							offset: 20,
							content: (data) => {
								return `${data.item}\n ${data.percent * 100}%`;
							},
							style: {
								fill: colors[item],
							},
						};
					},
				]}
			/>
		</Chart>
	);
}

export default Labelline