/** @param {NS} ns */
export async function main(ns) {
	var serverName = ns.args[0]
	ns.disableLog('ALL');
	ns.print("Server: ", serverName)
	while (true) {
		ns.print("RAM: ", ns.getServerUsedRam(serverName), " / ", ns.getServerMaxRam(serverName))
		await ns.sleep(5000)
	}

}