/** @param {NS} ns */

// Find servers not running scripts
export async function main(ns) {
	var script = ns.args[0]
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
		//ns.tprint(serverName);
		if (!ns.scriptRunning(script, serverName) && ns.hasRootAccess(serverName) && ns.getServerMaxRam(serverName) > 0) {
			ns.tprint("Script Not Running on: ", serverName);
		}
	}
}