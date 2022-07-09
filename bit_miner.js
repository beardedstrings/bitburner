/** @param {NS} ns */

/*
Author: BeardedStrings



*/

export async function main(ns) {
	//let target = serverlist[i];
	var server = ns.args[0];
	var target = ns.args[1];

	ns.tprint("Target for " + server + " is " + target);

	while (true) {
		var weakT = Math.round(ns.getWeakenTime(target))
		var growT = Math.round(ns.getGrowTime(target))
		//var hackT = Math.round(ns.getHackTime(target))

		// time of the greatest
		var longestTime = 0

		if (growT > weakT) {
			longestTime = growT
		} else {
			longestTime = weakT
		}
		// Get unused RAM on Server 
		//let maxRam = ns.getServerMaxRam(server); // server = hostname
		let free_ram = ns.getServerMaxRam(server) - ns.getServerUsedRam(server)
		let hackRam = ns.getScriptRam("hack.js", server);
		let weakRam = ns.getScriptRam("weak.js", server);
		let growRam = ns.getScriptRam("grow.js", server);

		// taking the total threads and dividing them up
		let wthreads = Math.floor((free_ram * (0.30)) / weakRam);
		let gthreads = Math.floor((free_ram * (0.60)) / growRam);
		let hthreads = Math.floor((free_ram * (0.10)) / hackRam);

		if (wthreads < 1) {
			wthreads = 1
		};

		if (gthreads < 1) {
			gthreads = 1
		};

		if (hthreads < 1) {
			hthreads = 1
		};

		let shackTime = ns.getHackTime(target); // hack time on target
		// let sgrowTime = ns.getGrowTime(target); // grow time on target
		let sweakTime = ns.getWeakenTime(target);
		let time = (sweakTime - (shackTime - 100)); // time is grow time doubled with hack time minus 100

		ns.exec("grow.js", server, gthreads, target);
		ns.exec("weak.js", server, wthreads, target);
		ns.exec("hack.js", server, hthreads, target, time);
		await ns.sleep(longestTime + 2000)
	}

}