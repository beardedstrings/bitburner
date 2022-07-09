/** @param {NS} ns */

// Purchase server(s) 
// Create a cluster of servers

// ServerName - Num of Servers - RAM 

export async function main(ns) {
	var serverPrefix = ns.args[0];
	var serverNum = ns.args[1];
	var ram = ns.args[2];

	for (let i = 0; i < serverNum; i++) {
		var serverName = String(serverPrefix + i);
		if (ns.serverExists(serverName)) {
			ns.print(serverName);
			ns.print("server already exists")
		}
		else {
			ns.print(serverName);
			ns.purchaseServer(serverName, ram);
			ns.print("")
		}
	}

}