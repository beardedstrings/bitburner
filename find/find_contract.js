/** @param {NS} ns */

export async function main(ns) {

	let servers = [];
	let serversToScan = ns.scan("home");
	while (serversToScan.length > 0) {
		let server = serversToScan.shift();
		if (!servers.includes(server) && server !== "home") {
			servers.push(server);
			serversToScan = serversToScan.concat(ns.scan(server));
		}
	}
	var hackLevel = ns.getHackingLevel()
	for (let serverName of servers) {
		//ns.tprint(serverName);
		var skillNeeded = ns.getServerRequiredHackingLevel(serverName)
		//if (skillNeeded > 1 && skillNeeded <= hackLevel) {
			ns.tprint(serverName," ",ns.ls(serverName, ".cct"))

			if (!ns.hasRootAccess(serverName)) {

			}

			//let newServers = ns.scan(serverName)
		//}
	}


}