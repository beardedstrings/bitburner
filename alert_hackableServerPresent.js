/** @param {NS} ns */
// ALERT: Hackable Server Present
// Vulnerability Scanner
// Each minute scan all the servers and find ones we can hack

export async function main(ns) {
	while (true) {
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
			if (skillNeeded > 1 && skillNeeded <= hackLevel) {
				if (!ns.hasRootAccess(serverName)) {
					ns.tprint("ALERT: Server can be hacked! Vulnerability detected.")
					ns.tprint(serverName, " : ", skillNeeded)
				}

				//let newServers = ns.scan(serverName)
			}
		}
	await ns.sleep(60000)
	}

}
/*let servers = ns.scan("home");
	//ns.tprint(servers);
	for (let serverName of servers) {
		//ns.tprint(serverName);
		var skill = ns.getServerRequiredHackingLevel(serverName)
		if (skill > 1) {
			ns.tprint(serverName, " ", skill)
		}
		//let newServers = ns.scan(serverName)
	}
	*/