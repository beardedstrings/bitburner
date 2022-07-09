/** @param {NS} ns */


export async function main(ns) {
	let hostName = ns.args[0]
	let serverName = ns.args[1]

	ns.disableLog('ALL');

	// Script needs to account for not filling up the RAM and crashing
	// Full Servers with root access scan 
	/*
		let servers = [];
		let serversToScan = ns.scan("home");
	
		while (serversToScan.length > 0) {
			let server = serversToScan.shift();
			if (!servers.includes(server) && server !== "home") {
				servers.push(server);
				serversToScan = serversToScan.concat(ns.scan(server));
			}
		}
		for (let serverName of servers) {
			if (ns.hasRootAccess(serverName) && ns.getServerSecurityLevel(serverName) > 1) {  // Include condition not to hack own servers
			*/
	var moneyThresh = ns.getServerMaxMoney(serverName) * 0.75;
	var minSec = ns.getServerMinSecurityLevel(serverName)
	//var maxMoney = Math.round(ns.getServerMaxMoney(serverName))
	var threadsForWeaken = 1
	var threadsForGrow = 1
	var baseTime = 0
	var threadsForHack = Math.round(ns.hackAnalyzeThreads(serverName, moneyThresh) + 1)
	while (true) {
		if (threadsForHack < 1) {
			threadsForHack = 236
		}
		ns.print("Threads for hack: ", threadsForHack)


		ns.print(serverName);
		var moneyOnSystem = Math.round(ns.getServerMoneyAvailable(serverName))
		var secLevel = ns.getServerSecurityLevel(serverName)
		var weakT = Math.round(ns.getWeakenTime(serverName) + 1)
		var growT = Math.round(ns.getGrowTime(serverName) + 1)
		var hackT = Math.round(ns.getHackTime(serverName) + 1)
		var secT = Math.round(ns.getServerSecurityLevel(serverName))

		ns.print("Money: ", moneyOnSystem, " Sec: ", secLevel)
		// Determine the threads required to lower the security
		if (ns.getServerSecurityLevel(serverName) > ns.getServerMinSecurityLevel(serverName) + 4) {
			var weakenAmount = Math.round((ns.getServerSecurityLevel(serverName)) - (minSec + 4))
			threadsForWeaken = Math.round(weakenAmount / ns.weakenAnalyze(1))
			ns.print("Threads for weaken: ", threadsForWeaken)
		}
		else {
			threadsForWeaken = 0
			ns.print("Weaken not required")
		}
		// How much do we have to grow?
		if (moneyThresh > moneyOnSystem) { // If true we must grow the money
			threadsForGrow = Math.round(ns.growthAnalyze(serverName, Math.round((moneyThresh / moneyOnSystem) + 1)))
			ns.print("Threads for grow: ", threadsForGrow)
		}
		else {
			threadsForGrow = 0 // we are maxed
			ns.print("Grow not required")
		}
		// How many threads to take the money thresh ?
		ns.print("Threads for hack: ", threadsForHack)

		var baseTime = 0 // The time for the longest operation to complete
		if (threadsForWeaken > 1) { // 
			baseTime = weakT + 20
			var growDelay = (baseTime + 100) - (growT)
			var hackDelay = (baseTime + 200) - (hackT)
			ns.print("W.baseTime: ", baseTime)

			ns.exec("weak.js", hostName, threadsForWeaken, serverName)
			ns.exec("grow.js", hostName, threadsForGrow, serverName, growDelay)
			ns.exec("hack.js", hostName, threadsForHack, serverName, hackDelay)
		}
		else if (threadsForGrow > 1) {
			baseTime = growT + 20
			var hackDelay = (baseTime + 200) - (hackT)
			ns.print("G.baseTime: ", baseTime)
			ns.exec("grow.js", hostName, threadsForGrow, serverName)
			ns.exec("hack.js", hostName, threadsForHack, serverName, hackDelay)
		}
		else {
			baseTime = hackT + 20
			ns.print("H.baseTime: ", baseTime)
			ns.exec("hack.js", hostName, threadsForHack, serverName, 0)
		}
		await ns.sleep(baseTime + 1000) // Sleep to wait for end of wgh cycle
		ns.print("")
		ns.print("Money: ", moneyOnSystem, " Sec: ", secLevel)
		await ns.sleep(500)
	}
}




/*
1750000 1.158 1 5632
hack 64.73170250542513
grow 7.850059300336469
weak 0.05
Script killed
 */