/** @param {NS} ns */
export async function main(ns) {
	var serverPrefix = ns.args[0];
	var serverNum = ns.args[1];

	for (let i = 0; i < serverNum; i++) {
		var serverName = String(serverPrefix + i);
		ns.exec("opti_all.js", "home", 1, serverName);
		await ns.sleep(5000)

	}
}