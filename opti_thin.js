/** @param {NS} ns */


export async function main(ns) {
	var target = ns.args[0];
	//let serverName = ns.args[1]

	ns.disableLog('ALL');

	//Target Server
	let serverName = target

	let workers = ["worker-0", "worker-1", "worker-2"]


	for (let worker of workers) {
		var hostName = worker
		if (!ns.fileExists("hack.js", hostName) || !ns.fileExists("weak.js", hostName) || !ns.fileExists("grow.js", hostName)) {
			await ns.scp("hack.js", hostName)
			await ns.scp("weak.js", hostName)
			await ns.scp("grow.js", hostName)
		}
	}
	// Pwned Servers
	let pwnedServer = ["sigma-cosmetics"]

	//servers = ["iron-gym", "nectar-net", "zer0", "max-hardware", "phantasy", "neo-net", "omega-net", "silver-helix", "computek", "crush-fitness", "the-hub", "netlink", "johnson-ortho", "zb-institute", "summit-uni", "rothman-uni", "syscore", "catalyst", "rho-construction", "lexo-corp", "alpha-ent", "aevum-police", "millenium-fitness"]
	let worker = "four-1"
	// Possible for statement here
	if (ns.hasRootAccess(serverName) && ns.getServerMaxMoney(serverName) > 0) {  // Include condition not to hack own servers
		ns.print(serverName)
		// For target determine what to run
		var moneyOnSystem = Math.round(ns.getServerMoneyAvailable(serverName))
		var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
		var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
		var moneyToHack = 0
		if (moneyThresh > ns.getServerMoneyAvailable(serverName)) {
			moneyToHack = ns.getServerMoneyAvailable(serverName)
		}

		else {
			moneyToHack = moneyThresh
		}

		while (true) {
			ns.print(" $", Math.round(ns.getServerMoneyAvailable(serverName)), " / ", ns.getServerMaxMoney(serverName))

			for (let worker of workers) {
				// WEAK //
				if (ns.getServerSecurityLevel(target) > securityThresh) {
					//await ns.weaken(target); // lower security

					//var weakenAmount = Math.round((ns.getServerSecurityLevel(serverName)) - (minSec + 4))
					var threadsForWeak = Math.ceil((ns.getServerSecurityLevel(serverName) - ns.getServerMinSecurityLevel(serverName)) * 20)
					ns.print(" Threads for weaken: ", threadsForWeak)
					var scriptRam = ns.getScriptRam("weak.js") // Reports RAM required to run
					var threads = 0

					let free_ram = ns.getServerMaxRam(worker) - ns.getServerUsedRam(worker)
					threads = free_ram / scriptRam // how many threads can we run
					ns.print("## ", worker, " can operate weak() with threads: ", Math.floor(threads), " ##")
					if (threads > threadsForWeak) {
						ns.print(" ", worker, " weaken with thread count ", Math.round(threadsForWeak))
						ns.exec("weak.js", worker, threadsForGrow, target);
						threadsForWeak -= threadsForWeak
					}
					else {
						ns.print(" ", worker, " weaken with thread count ", Math.round(threads))
						ns.exec("grow.js", worker, threads, target);
						threadsForWeak -= threads
					}

					ns.print("Waiting for: ", Math.round(ns.getWeakenTime(target)))
					//await ns.sleep(ns.getWeakenTime(target) + 20)
					await ns.sleep(1000)


					// GROW //
				} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
					//	await ns.grow(target); // spoof money
					var threadsForGrow = Math.round(ns.growthAnalyze(serverName, Math.round(moneyThresh / moneyOnSystem))) // +1 to deal with rounding / zero
					ns.print(" Threads for grow: ", threadsForGrow)
					var scriptRam = ns.getScriptRam("grow.js") // Reports RAM required to run
					var threads = 0



					let free_ram = ns.getServerMaxRam(worker) - ns.getServerUsedRam(worker)
					threads = free_ram / scriptRam // how many threads can we run
					ns.print("## ", worker, " can operate grow() with threads: ", Math.floor(threads), " ##")
					if (threads > threadsForGrow) {
						ns.print(" ", worker, " grow with thread count ", Math.round(threadsForGrow))
						ns.exec("grow.js", worker, threadsForGrow, target);
						threadsForGrow -= threadsForGrow
					}
					else {
						ns.print(" ", worker, " grow() with thread count ", Math.round(threads))
						ns.exec("grow.js", worker, threads, target);
						threadsForGrow -= threads
					}

					ns.print("Waiting for: ", Math.round(ns.getGrowTime(target)))
					//await ns.sleep(ns.getGrowTime(target) + 20)
					await ns.sleep(1000)


					// HACK //
				} else {
					//	await ns.hack(target); // steal money
					var threadsForHack = ns.hackAnalyzeThreads(serverName, moneyToHack)
					ns.print(" Threads for hack: ", threadsForHack)
					var scriptRam = ns.getScriptRam("hack.js") // Reports RAM required to run
					var threads = 0

					let free_ram = ns.getServerMaxRam(worker) - ns.getServerUsedRam(worker)
					threads = free_ram / scriptRam // how many threads can we run
					ns.print("## ", worker, " can operate hack() with threads: ", Math.floor(threads), " ##")
					if (threads > threadsForHack) {
						ns.print(" ", worker, " weaken with thread count ", Math.round(threadsForHack))
						ns.exec("weak.js", worker, threadsForGrow, target);
						threadsForHack -= threadsForHack
					}
					else {
						ns.print(" ", worker, " hack() with thread count ", Math.round(threads))
						ns.exec("grow.js", worker, threads, target);
						threadsForHack -= threads
					}

					ns.print("Waiting for: ", Math.round(ns.getWeakenTime(target)))
					//await ns.sleep(ns.getWeakenTime(target) + 20)
					await ns.sleep(1000)
				}
			}
			ns.print("")
			await ns.sleep(1000)
		}
	}
}