/** @param {NS} ns */
// bot_scp_hgh.js
//

export async function main(ns) {
	var serverSet = ns.args[0];
	var serverNum = ns.args[1];


	for (let i = 0; i < serverNum; i++) {
		var hostName = String(serverSet + i)
		if (ns.serverExists(hostName)) {
			ns.print(hostName)
			ns.deleteServer(hostName)
			ns.print("")
		}
	}
}