/** @param {NS} ns */
// bot_scp_hgh.js
//

// Delete a server by name, 

// Prompt if the user is sure they want to delete the server

export async function main(ns) {
	var hostName = ns.args[0];
	if (ns.serverExists(hostName)) {
		ns.killall(hostName)
		// print starting all scripts were stopped
		ns.deleteServer(hostName)
		// check if deleted, report status
	}
	else{
		ns.tprint("Server not found")
	}
}