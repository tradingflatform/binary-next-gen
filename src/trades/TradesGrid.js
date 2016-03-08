import React, { PropTypes, Component } from 'react';
import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesGrid extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        activeTradeIndex: PropTypes.number.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    render() {
        const { actions, activeTradeIndex, trades, ticksForAllSymbols, contracts } = this.props;

        return (
            <div className="trades-grid">
                {trades.map((trade, index) =>
                    (contracts[trade.symbol] && <FullTradeCard
                        key={index}
                        index={index}
                        actions={actions}
                        trade={trade}
                        isActive={index === activeTradeIndex}
                        ticks={ticksForAllSymbols[trade.symbol]}
                        contract={contracts[trade.symbol]}
                    />)
                )}
            </div>
        );
    }
}
