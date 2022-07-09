/** @param {NS} ns */

export async function main(ns) {
	function numCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
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
				if (ns.hasRootAccess(serverName)) {
					var maxMoney = ns.getServerMaxMoney(serverName)
					ns.tprint(serverName, " : ", numCommas(maxMoney))

				}
			}
		}


	}

/* Server has high money, low times, */