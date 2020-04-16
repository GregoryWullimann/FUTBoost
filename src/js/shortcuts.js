import actions from "./actions.js";

var shortcuts = [
{
	f: actions.switchCardView,
	fullText: "Switch card view",
	shortcut: "p"
},
{
	f: actions.resetSearchFilter,
	fullText: "Reset filter",
	shortcut: "r"
},
{
	f: actions.buyNow,
	fullText: "Buy now",
	shortcut: "b"
},
{
	f: actions.makeBid,
	fullText: "Make bid",
	shortcut: "m"
},
{
	f: actions.searchMarket,
	fullText: "Search market",
	shortcut: "s"
},
{
	f: actions.watchToggle,
	fullText: "Watch toggle",
	shortcut: "w"
},
{
	f: actions.prevPage,
	fullText: "Previous page",
	shortcut: "ArrowLeft"
},
{
	f: actions.nextPage,
	fullText: "Next page",
	shortcut: "ArrowRight"
},
{
	f: actions.goBack,
	fullText: "Go back",
	shortcut: "Backspace"
},
{
	f: actions.storeAll,
	fullText: "Store all",
	shortcut: "a"
},
{
	f: actions.quickSellAll,
	fullText: "Quick sell all",
	shortcut: "q"
},
{
	f: actions.comparePrice,
	fullText: "Compare price",
	shortcut: "c"
},
{
	f: actions.storeItem,
	fullText: "Store item",
	shortcut: "x"
},
{
	f: actions.sendToTransfer,
	fullText: "Send to transfer",
	shortcut: "y"
},
{
	f: actions.quickSell,
	fullText: "Quick sell",
	shortcut: "o"
},
{
	f: actions.listItem,
	fullText: "List item",
	shortcut: "l"
},
{
	f: actions.listItemMinBIN,
	fullText: "List item min. BIN",
	shortcut: "k"
},
{
	f: actions.makePriceBid,
	fullText: "Make bid",
	shortcut: "u",
	params: [{name: "Price", value: 750}]
},
{
	f: actions.listItemPrice,
	fullText: "List item",
	shortcut: "j",
	params: [{name: "Start", value: 500}, {name: "BIN", value: 5000}]
},
{
	f: actions.selectPrevItem,
	fullText: "Select previous item",
	shortcut: "ArrowUp"
},
{
	f: actions.selectNextItem,
	fullText: "Select next item",
	shortcut: "ArrowDown"
}
]

export default shortcuts