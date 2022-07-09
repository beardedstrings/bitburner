/** @param {NS} ns */

// Author: BeardedStrings
// Date: 7/2022
// Calculate threads required and distribute workload across a server suite
// Load balancer


function printText(ns, textString) {
	textString += textString
	ns.print(textString)
	return textString
}

function threadsWorkerCanSupport(ns, worker, script){
	let threadsSupported = 0
	return threadsSupported
}

function sendJobToWorker(ns, worker, script, threads){

	return "Job Sent"

}


export async function main(ns) {
	let hostName = ns.args[0] // hostName is server running as the work manager

	ns.disableLog('ALL');

	// Send attack tools if worker does not have them
	if (!ns.fileExists("hack.js", hostName) || !ns.fileExists("weak.js", hostName) || !ns.fileExists("grow.js", hostName)) {
		await ns.scp("hack.js", hostName)
		await ns.scp("weak.js", hostName)
		await ns.scp("grow.js", hostName)
	}

	// Declare Variables

	// Target Servers
	let servers = ["foodnstuff"]
	let serverName = "foodnstuff"
	// Workers
	let workers = ["home"]
	// Determine WeakGrowHack

	var moneyThresh = ns.getServerMaxMoney(serverName) * 0.75;
	var minSec = ns.getServerMinSecurityLevel(serverName)
	var threadsForWeaken = 1
	var threadsForGrow = 1
	var baseTime = 0
	var moneyToHack = 0

	// Start loops in this area

	if (moneyThresh > ns.getServerMoneyAvailable(serverName)) {
		moneyToHack = ns.getServerMoneyAvailable(serverName)
	}
	else {
		moneyToHack = moneyThresh
	}
	var threadsForHack = Math.ceil(ns.hackAnalyzeThreads(serverName, moneyToHack))

	ns.print(serverName);
	if (threadsForHack == Infinity) {
		threadsForHack = 1
	}
	if (threadsForHack <= 0) {
		threadsForHack = 1
	}

	var moneyOnSystem = Math.ceil(ns.getServerMoneyAvailable(serverName) + 1)
	var secLevel = ns.getServerSecurityLevel(serverName)

	var weakT = Math.round(ns.getWeakenTime(serverName))
	var growT = Math.round(ns.getGrowTime(serverName))
	var hackT = Math.round(ns.getHackTime(serverName))

	ns.print("Money: ", moneyOnSystem, " Sec: ", Math.round(secLevel), " MonThresh: ", moneyThresh)


	// Determine the threads required to lower the security
	if (secLevel > minSec + 4) {
		var weakenAmount = Math.round(secLevel - (minSec + 4))
		threadsForWeaken = Math.round(weakenAmount / ns.weakenAnalyze(1))
		if (threadsForWeaken = 0) {
			ns.print(" Weaken not required")
		}
		else {
			ns.print(" Threads for weaken: ", threadsForWeaken)
		}
	}
	else {
		threadsForWeaken = 0
		ns.print(" Weaken not required")
	}
	// How much do we have to grow
	if (moneyThresh > moneyOnSystem) { // If true we must grow the money
		threadsForGrow = Math.ceil(ns.growthAnalyze(serverName, moneyThresh / moneyOnSystem)) // +1 to deal with rounding / zero
		if (threadsForGrow == Infinity) {
			ns.print("Infinity Grow")
			threadsForGrow = 111
		}
		ns.print(" Threads for grow: ", threadsForGrow)
	}
	else {
		threadsForGrow = 0 // we are maxed
		ns.print(" Grow not required")
	}

	// How many threads to take the money thresh
	ns.print(" Threads for hack: ", threadsForHack)
	var availableRAM = (ns.getServerMaxRam(hostName) - ns.getServerUsedRam(hostName))
	ns.print("RAM :", Math.floor(availableRAM))
	var totalRAMCost = 0
	var weakRAMCost = 0
	var growRAMCost = 0
	var hackRAMCost = 0
	var baseTime = 0 // The time for the longest operation to complete
	var growDelay = 0
	var hackDelay = 0
	var maxRAM = ns.getServerMaxRam(hostName)

	// WEAKEN
				if (threadsForWeaken >= 1) { // 
					ns.print("WEAKEN")
					baseTime = weakT + 20
					growDelay = (baseTime + 100) - (growT)
					hackDelay = (baseTime + 200) - (hackT)
					if (threadsForGrow <= 0) {
						threadsForGrow = 1
					}
					weakRAMCost = ns.getScriptRam("weak.js", hostName, threadsForWeaken)
					growRAMCost = ns.getScriptRam("grow.js", hostName, threadsForGrow)
					hackRAMCost = ns.getScriptRam("hack.js", hostName, threadsForHack)
					totalRAMCost = weakRAMCost + growRAMCost + hackRAMCost

					ns.exec("weak.js", hostName, threadsForWeaken, serverName)
					ns.exec("grow.js", hostName, threadsForGrow, serverName, growDelay)
					ns.exec("hack.js", hostName, threadsForHack, serverName, hackDelay)
				}
}