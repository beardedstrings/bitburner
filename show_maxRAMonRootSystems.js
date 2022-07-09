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
	
	for (let serverName of servers) {
		//ns.tprint(serverName);
		let maxRAM = ns.getServerMaxRam(serverName)
		if (ns.hasRootAccess(serverName) && maxRAM > 0) {
			ns.tprint(serverName, " Max RAM: ",maxRAM);
		}
	}
}