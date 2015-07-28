import React from 'react';
import moment from 'moment';

export default class PortfolioDetails {

	render() {

		const { contract } = this.props;

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Start Time</th>
							<th>Now</th>
							<th>End Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{moment.unix(contract.date_start).format('h:mm:ss a')}</td>
							<td>todo</td>
							<td>{moment.unix(contract.expiry_time).format('h:mm:ss a')}</td>
						</tr>
						<tr>
							<td></td>
							<td>now - start</td>
							<td>end - now</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Entry Spot</th>
							<th>Current Spot</th>
							<th>Exit Spot</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{contract.entry_spot}</td>
							<td>{contract.spot}</td>
							<td>{contract.exit_spot}</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Purchase Price</th>
							<th>Indicative Price</th>
							<th>Final Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{contract.currency} {contract.buy_price}</td>
							<td>{contract.currency} {contract.indicative}</td>
							<td>{contract.currency} {contract.final_price}</td>
						</tr>
						<tr>
							<td></td>
							<td>-???</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
