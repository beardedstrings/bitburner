/** @param {NS} ns */


export async function main(ns) {
	let hostName = ns.args[0]
	//let serverName = ns.args[1]

	ns.disableLog('ALL');

	// Script needs to account for not filling up the RAM and crashing
	// Full Servers with root access scan 

	if (!ns.fileExists("hack.js", hostName) || !ns.fileExists("weak.js", hostName) || !ns.fileExists("grow.js", hostName)) {
		await ns.scp("hack.js", hostName)
		await ns.scp("weak.js", hostName)
		await ns.scp("grow.js", hostName)
	}

	let servers = [];

	// HERE include code to choose the targets based on the server RAM capabilities
	//servers = ["n00dles", "foodnstuff", "sigma-cosmetics"]
	//servers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns"]

	//servers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"]
	//servers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "nectar-net", "zer0", "max-hardware", "phantasy"]


	// Tier 2 worker-5 is running T2
	//servers = ["sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "neo-net", "zer0", "max-hardware", "phantasy"]

	// T2 / 3
	//servers = ["harakiri-sushi", "iron-gym", "neo-net", "zer0", "max-hardware", "phantasy", "silver-helix", "crush-fitness", "omega-net", "johnson-ortho", "the-hub", "rothman-uni", "computek", "aevum-police", "millenium-fitness", "netlink", "summit-uni"]
	// Tier 3  attempt with a P17 server
	//servers = ["silver-helix", "crush-fitness", "omega-net", "johnson-ortho", "the-hub", "rothman-uni", "computek", "aevum-police", "millenium-fitness", "netlink", "summit-uni"]

	// tier 4
	//servers = ["iron-gym", "nectar-net", "zer0", "max-hardware", "phantasy", "neo-net", "omega-net", "silver-helix", "computek", "crush-fitness", "the-hub", "netlink", "johnson-ortho", "zb-institute", "summit-uni", "rothman-uni", "syscore", "catalyst", "rho-construction", "lexo-corp", "alpha-ent", "aevum-police", "millenium-fitness"]


	while (true) {

		let serversToScan = ns.scan("home");

		while (serversToScan.length > 0) {
			let server = serversToScan.shift();
			if (!servers.includes(server) && server !== "home") {
				servers.push(server);
				serversToScan = serversToScan.concat(ns.scan(server));
			}
		}

		for (let serverName of servers) {
			if (ns.hasRootAccess(serverName) && /*(ns.getServerRequiredHackingLevel(serverName) > 1) && */ ns.getServerMaxMoney(serverName) > 0) {  // Include condition not to hack own servers
				var moneyThresh = ns.getServerMaxMoney(serverName) * 0.75;
				var minSec = ns.getServerMinSecurityLevel(serverName)
				//var maxMoney = Math.round(ns.getServerMaxMoney(serverName))
				var threadsForWeaken = 1
				var threadsForGrow = 1
				var baseTime = 0
				var moneyToHack = 0
				if (moneyThresh > ns.getServerMoneyAvailable(serverName)) {
					moneyToHack = ns.getServerMoneyAvailable(serverName)
				}
				else {
					moneyToHack = moneyThresh
				}
				var threadsForHack = Math.ceil(ns.hackAnalyzeThreads(serverName, moneyToHack))
				ns.print(" ### ", serverName, " ### ");
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

				ns.print("Money: ", moneyOnSystem, " Sec: ", Math.round(secLevel), " m.Thresh: ", moneyThresh)

				// Determine the threads required to lower the security
				if (secLevel > minSec + 4) {
					var weakenAmount = Math.ceil((secLevel) - (minSec + 4))
					threadsForWeaken = (weakenAmount / ns.weakenAnalyze(1));
					ns.print("t.weaken: ", threadsForWeaken)

					if (threadsForWeaken == 0) {
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
					threadsForGrow = Math.ceil(ns.growthAnalyze(serverName, (moneyThresh / moneyOnSystem))) // +1 to deal with rounding / zero

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

				ns.print("RAM :", Math.floor(availableRAM))
				var totalRAMCost = 0
				var weakRAMCost = 0
				var growRAMCost = 0
				var hackRAMCost = 0
				var baseTime = 0 // The time for the longest operation to complete
				var growDelay = 0
				var hackDelay = 0
				var maxRAM = ns.getServerMaxRam(hostName)
				var availableRAM = maxRAM - ns.getServerUsedRam(hostName)
				// WEAKEN
				if (threadsForWeaken >= 1) { // 
					ns.print("## Weaken Cycle ##")
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
					ns.print("t.RAM: ", totalRAMCost, " a.RAM: ", availableRAM)
					if (totalRAMCost > availableRAM) {
						ns.print("Lack of RAM")
						while (totalRAMCost > availableRAM) {
							if (totalRAMCost > maxRAM || totalRAMCost > (maxRAM * .20)) {
								let threadReductionRatio = (1 - (availableRAM / totalRAMCost))
								ns.print("RTR: ", threadReductionRatio)

								threadsForWeak = Math.floor(threadsForWeak * (threadReductionRatio * .1))
								if (threadsForGrow <= 0) {
									threadsForGrow = 1
								}
								if (threadsForGrow > 1) {
									threadsForGrow = Math.floor(threadsForHack * (threadReductionRatio * .1))
									if (threadsForGrow <= 0) {
										threadsForGrow = 1
									}
								}
								if (threadsForHack > 1) {
									threadsForHack = Math.floor(threadsForHack * (threadReductionRatio * .1))
									if (threadsForHack <= 0) {
										threadsForHack = 1
									}
								}
								weakRAMCost = ns.getScriptRam("weak.js", hostName) * threadsForWeak
								growRAMCost = ns.getScriptRam("grow.js", hostName) * threadsForGrow
								hackRAMCost = ns.getScriptRam("hack.js", hostName) * threadsForHack
								totalRAMCost = weakRAMCost + growRAMCost + hackRAMCost
							}
							ns.print("")
							ns.print("Reduced Threads ")
							ns.print(" g.ram: ", growRAMCost, " h.ram: ", hackRAMCost, " t.ram:  ", totalRAMCost, " a.ram: ", availableRAM)
							await ns.sleep(1000)
							availableRAM = maxRAM - ns.getServerUsedRam(hostName)
							if (availableRAM < maxRAM * .25) {
								ns.print("Awaiting RAM to free")
								await ns.sleep(7000)
							}
							if (totalRAMCost < availableRAM) {
								break;
							}
						}
					}
					ns.exec("weak.js", hostName, threadsForWeaken, serverName)
					ns.exec("grow.js", hostName, threadsForGrow, serverName, growDelay)
					ns.exec("hack.js", hostName, threadsForHack, serverName, hackDelay)
				}
				// GROW
				else if (threadsForGrow >= 1) {
					ns.print(" # Grow cycle #")
					baseTime = growT + 200
					hackDelay = (baseTime + 200) - (hackT)
					if (threadsForGrow == Infinity) {
						ns.print("Infinity Grow")
						threadsForGrow = 111
					}

					growRAMCost = ns.getScriptRam("grow.js", hostName) * threadsForGrow
					hackRAMCost = ns.getScriptRam("hack.js", hostName) * threadsForHack
					totalRAMCost = growRAMCost + hackRAMCost
					ns.print("t.RAM: ", totalRAMCost, " a.RAM: ", availableRAM)
					if (totalRAMCost > availableRAM) {
						ns.print("Lack of RAM")
						while (totalRAMCost > availableRAM) {
							if (totalRAMCost > maxRAM || totalRAMCost > (maxRAM * .20)) {
								let threadReductionRatio = (1 - (availableRAM / totalRAMCost))
								ns.print("RTR: ", threadReductionRatio)
								threadsForGrow = Math.floor(threadsForGrow * (threadReductionRatio * .1))
								if (threadsForGrow <= 0) {
									threadsForGrow = 1
								}
								if (threadsForHack > 1) {
									threadsForHack = Math.floor(threadsForHack * (threadReductionRatio * .1))
									if (threadsForHack <= 0) {
										threadsForHack = 1
									}
								}
								growRAMCost = ns.getScriptRam("grow.js", hostName) * threadsForGrow
								hackRAMCost = ns.getScriptRam("hack.js", hostName) * threadsForHack
								totalRAMCost = growRAMCost + hackRAMCost
								ns.print("")
								ns.print("Reduced g.Threads: ", threadsForGrow)
								ns.print(" g.ram: ", growRAMCost, " h.ram: ", hackRAMCost, " t.ram:  ", totalRAMCost, " a.ram: ", availableRAM)
							}
							await ns.sleep(500)
							availableRAM = (ns.getServerMaxRam(hostName) - ns.getServerUsedRam(hostName))
							if (availableRAM < maxRAM * .25) {
								ns.print("Awaiting RAM to free")
								await ns.sleep(7000)
							}
							if (totalRAMCost < availableRAM) {
								break;
							}
						}
					}
					ns.exec("grow.js", hostName, threadsForGrow, serverName, 0)
					ns.exec("hack.js", hostName, threadsForHack, serverName, hackDelay)
				}
				else if (threadsForHack >= 1) {
					ns.print("## Hack Cycle ##")
					hackRAMCost = ns.getScriptRam("hack.js", hostName, threadsForHack)
					totalRAMCost = hackRAMCost
					if (totalRAMCost > availableRAM) {
						ns.print("Waiting for RAM")
						while (totalRAMCost > availableRAM) {
							await ns.sleep(7000)
							availableRAM = (ns.getServerMaxRam(hostName) - ns.getServerUsedRam(hostName))
							if (totalRAMCost < availableRAM) {
								break;
							}
						}
					}
					if (threadsForHack > 1) {
						ns.exec("hack.js", hostName, threadsForHack, serverName, 0)
					}
				}
				ns.print("")
				await ns.sleep(1000)
			}
		} // end if for hackable server
		ns.print("")
		await ns.sleep(5000)
	} // end For loop for servers

}



/*
1750000 1.158 1 5632
hack 64.73170250542513
grow 7.850059300336469
weak 0.05
Script killed
 */