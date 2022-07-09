/** @param {NS} ns */
// bot_scp_hgh.js
//


//var hostName = "tek-";
//var serverNum = 8;

export async function main(ns) {
	var serverSet = ns.args[0];
	var serverNum = ns.args[1];
	var scriptName = ns.args[2];

	for (let i = 0; i < serverNum; i++) {
		var hostName = String(serverSet + i)
		if (ns.serverExists(hostName)) {
			ns.print(hostName)
			ns.killall(hostName)
			ns.print("")
		}
	}

}