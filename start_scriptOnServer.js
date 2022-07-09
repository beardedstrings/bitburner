/** @param {NS} ns */

//startScriptOnServer.js
// host to run script - Script to run - target to attack

export async function main(ns) {
	var hostname = ns.args[0];
	var script = ns.args[1];
	var target = ns.args[2];

	ns.tprint("Attempting to start", script, " on: ", hostname)
	if (ns.hasRootAccess(hostname)) {
		if (!ns.fileExists(script)) {
			ns.scp(script, hostname)
		}
		var scriptRam = ns.getScriptRam(script) // Reports RAM required to run
		var threads = 0
		let free_ram = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)

		threads = free_ram / scriptRam // how many threads can we run
		ns.tprint("## Can operate ", script, " with threads: ", Math.floor(threads), " ##")
		var startThreads= Math.floor(threads)
		ns.exec(script, hostname, startThreads, target);
		if(ns.scriptRunning(script, hostname)){
			ns.tprint("## Server says it is running the script ##")
		}
	}
	else {
		ns.tprint("Error: Lack of root access!")
	}




}