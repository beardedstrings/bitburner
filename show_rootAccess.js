/** @param {NS} ns */
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
			ns.tprint("Root on: ", serverName)
		}
	}
}