/** @param {NS} ns */

//import { gainFoothold } from "toolbox.js";

// Author: BeardedStrings
// Date: 7/2022
// Scans the network for vulnerable servers, runs exploits, 

// Add in function to auto hack n00dles and foodnstuff, scp and start up wgh.js at foodnstuff


export async function main(ns) {
	ns.exec("initial_n00dleStuff.js", 'home', 1);
	while (true) {
		let servers = [];
		let serversToScan = ns.scan("home");
		// Scan all servers
		while (serversToScan.length > 0) {
			let server = serversToScan.shift();
			if (!servers.includes(server) && server !== "home") {
				servers.push(server);
				serversToScan = serversToScan.concat(ns.scan(server));
			}
		}
		var hackLevel = ns.getHackingLevel()
		for (let serverName of servers) {
			var target = serverName
			var skillNeeded = ns.getServerRequiredHackingLevel(serverName)
			if (skillNeeded > 1 && skillNeeded <= hackLevel) {
				if (!ns.hasRootAccess(serverName)) {
					ns.tprint("ALERT: Server can be hacked! Vulnerability detected.")
					// run hacking tools
					ns.tprint("Performing breach protocol on ", target)
					// Port Crackers
					if (ns.fileExists("BruteSSH.exe", "home")) {
						ns.tprint("SSH bruted on ", serverName)
						ns.brutessh(target);
					}
					if (ns.fileExists("FTPCrack.exe", "home")) {
						ns.tprint("FTP cracked")
						ns.ftpcrack(target);
					}
					if (ns.fileExists("relaySMTP.exe", "home")) {
						ns.tprint("SMTP relay popped open")
						ns.relaysmtp(target);
					}
					if (ns.fileExists("HTTPWorm.exe", "home")) {
						ns.httpworm(target);
					}
					if (ns.fileExists("SQLInject.exe", "home")) {
						ns.sqlinject(target);
					}
					if (!ns.hasRootAccess(target)) {
						if ((ns.getServerNumPortsRequired(serverName)) < 1) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						if ((ns.getServerNumPortsRequired(serverName) == 1) && (ns.fileExists("BruteSSH.exe", "home"))) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						if ((ns.getServerNumPortsRequired(serverName) == 2) && (ns.fileExists("FTPCrack.exe", "home"))) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						if ((ns.getServerNumPortsRequired(serverName) == 3) && (ns.fileExists("relaySMTP.exe", "home"))) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						if ((ns.getServerNumPortsRequired(serverName) == 4) && (ns.fileExists("HTTPWorm.exe", "home"))) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						if ((ns.getServerNumPortsRequired(serverName) == 5) && (ns.fileExists("SQLInject.exe", "home"))) {
							ns.nuke(target)
							ns.tprint("Performed nuke on ", target)
						}
						await ns.sleep(1000)
						await ns.scp("targetBreach.js", target)
						await ns.scp("wgh.js", target)
					}
				} else {
					// Have root
					// check for scripts and if not there send them over
					if (!ns.fileExists("hack.js", serverName) || !ns.fileExists("weak.js", serverName) || !ns.fileExists("grow.js", serverName) || !ns.fileExists("wgh.js", serverName)) {
						ns.tprint("Sending scripts to ", serverName)
						await ns.scp("hack.js", serverName)
						await ns.scp("weak.js", serverName)
						await ns.scp("grow.js", serverName)
						await ns.scp("wgh.js", serverName)
					}
					var scriptRam = ns.getScriptRam("wgh.js") // Reports RAM required to run
					var threads = 0
					let free_ram = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName)
					threads = free_ram / scriptRam // how many threads can we run
					if (!ns.scriptRunning("wgh.js", serverName) && threads > 0 && ns.getServerRequiredHackingLevel(serverName) > 1 && ns.hasRootAccess("joesguns")) {
						ns.tprint("Attempting to start", "wgh.js", " on: ", serverName)
						ns.tprint("## Can operate ", "wgh.js", " with threads: ", Math.floor(threads), " ##")
						var startThreads = Math.floor(threads)
						ns.exec("wgh.js", serverName, startThreads, "joesguns");
					}
				}
			}
		}
		await ns.sleep(60000)
	}

}

// full network scan, nmap
/*let servers = ns.scan("home");
	//ns.tprint(servers);
	for (let serverName of servers) {
		//ns.tprint(serverName);
		var skill = ns.getServerRequiredHackingLevel(serverName)
		if (skill > 1) {
			ns.tprint(serverName, " ", skill)
		}
		//let newServers = ns.scan(serverName)
	}
	*/