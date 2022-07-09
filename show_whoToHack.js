/** @param {NS} ns */
export async function main(ns) {

	let servers = []
	let serversToScan = ns.scan("home");
	while (serversToScan.length > 0) {
		let server = serversToScan.shift();
		if (!servers.includes(server) && server !== "home") {
			servers.push(server);
			serversToScan = serversToScan.concat(ns.scan(server));
		}
	}
	for (let serverName of servers) {
		if ((ns.hasRootAccess(serverName) && ns.getServerRequiredHackingLevel(serverName) > 1 && ns.getServerMaxMoney(serverName) > 0)) {  // Include condition not to hack own servers
			ns.tprint("Attackable: ", serverName)
		}
	}
}