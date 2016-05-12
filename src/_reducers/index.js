import { combineReducers } from 'redux';

import boot from './BootReducer';
import appState from './AppStateReducer';
import account from './AccountReducer';
import assets from './AssetsReducer';
import assetIndex from './AssetIndexReducer';
import assetPicker from './AssetPickerReducer';
import createAccount from './CreateAccountReducer';
import dailyPrices from './DailyPricesReducer';
import feedLicenses from './FeedLicensesReducer';
import news from './NewsReducer';
import boughtContracts from './BoughtContractsReducer';
import paymentAgent from './PaymentAgentReducer';
import portfolio from './PortfolioReducer';
import proposals from './ProposalsReducer';
import quickTrade from './QuickTradeReducer';
import settings from './SettingsReducer';
import signin from './SigninReducer';
import states from './StatesReducer';
import server from './ServerReducer';

import tradesParams from './trades/TradesParamsReducer';
import tradesProposalInfo from './trades/TradesProposalInfoReducer';
import tradesPurchaseInfo from './trades/TradesPurchaseInfoReducer';
import tradesUIStates from './trades/TradesUIStateReducer';

import tradingOptions from './TradingOptionsReducer';
import tradingTimes from './TradingTimesReducer';
import transactions from './TransactionsReducer';
import ticks from './TickReducer';
import tickTrade from './TickTradeReducer';
import upgrade from './UpgradeReducer';
import video from './VideoReducer';
import views from './ViewsReducer';
import workspace from './WorkspaceReducer';
import watchlist from './WatchlistReducer';
import chartData from './ChartDataReducer';

export default combineReducers({
    appState,
    boot,
    account,
    assets,
    assetIndex,
    assetPicker,
    createAccount,
    chartData,
    news,
    server,
    paymentAgent,
    portfolio,
    boughtContracts,
    proposals,
    quickTrade,
    settings,
    signin,
    states,
    ticks,
    tickTrade,
    tradingTimes,
    transactions,
    tradesParams,
    tradesProposalInfo,
    tradesPurchaseInfo,
    tradesUIStates,
    tradingOptions,
    upgrade,
    video,
    workspace,
    watchlist,
    views,
    dailyPrices,
    feedLicenses,
});
