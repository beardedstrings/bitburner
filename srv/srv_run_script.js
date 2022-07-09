/** @param {NS} ns */
// 
// ARGS: SRV-SET, Num of Srv, Script, threads, target


export async function main(ns) {
	var serverSet = ns.args[0];
	var serverNum = ns.args[1];
	var runScript = ns.args[2];
	var threads = ns.args[3];
	var target = ns.args[4];

	for (let i = 0; i < serverNum; i++) {
		var hostName = String(serverSet + i);
		if (ns.serverExists(hostName)) {
			ns.print(hostName)
			ns.exec(runScript, hostName, threads, target);
			ns.print("")
		}
	}

}