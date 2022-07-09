/** @param {NS} ns */


// host to run script - Script to run - target to attack

export async function main(ns) {
	var target = ns.args[0];

	var script = "wgh.js"

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
		if (ns.hasRootAccess(serverName)) {  // Include condition not to hack own servers
			if (!ns.fileExists(script)) {
				ns.scp(script, serverName)
			}
			var scriptRam = ns.getScriptRam(script) // Reports RAM required to run
			var threads = 0
			let free_ram = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName)

			threads = free_ram / scriptRam // how many threads can we run
			if (!ns.scriptRunning(script, serverName) && threads > 0 && ns.getServerRequiredHackingLevel(serverName) > 1) {
				ns.tprint("Attempting to start", script, " on: ", serverName)
				ns.tprint("## Can operate ", script, " with threads: ", Math.floor(threads), " ##")
				var startThreads = Math.floor(threads)
				ns.exec(script, serverName, startThreads, target);
			}
			if (ns.scriptRunning(script, serverName)) {
				ns.tprint("## ",serverName ," Server says it is running the script ##")
			}
		}
	}

}