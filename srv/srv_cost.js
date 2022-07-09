/** @param {NS} ns */
export async function main(ns) {
	function numCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	}
	ns.tprint("Max RAM: ", ns.getPurchasedServerMaxRam())
	for (var i = 1; i <= 20; i++) {
		let serverCost = ns.getPurchasedServerCost(Math.pow(2, i))
		serverCost = numCommas(serverCost)
		ns.tprint(i + " -- " + serverCost, " RAM: ", numCommas(Math.pow(2, i)));
	}
}