/** @param {NS} ns */

// srv_scp.js
// Author: BeardedStrings
// Date: 7/2022
// Description: This script is used to transfer files to set/suite of servers from a host,
//              The server/suite has same prefix followed by a sequence number.
// Example usage: run srv_scp.js serverSet- 5 scripttomove.js
//			  This will transfer scripttomove.js to all servers in serverSet-1, serverSet-2, serverSet-3, etc.

export async function main(ns) {
	var serverSet = ns.args[0];
	var serverNum = ns.args[1];
	var copyScript = ns.args[2];

	for (let i = 0; i < serverNum; i++) {

		var hostName = String(serverSet + i)
		ns.print("hostName")
		// Send copy of script to server
		await ns.scp(copyScript, hostName)

		ns.print("")
	}
}