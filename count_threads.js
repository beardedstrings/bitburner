/** @param {NS} ns */
// count_threads.js

// author: BeardedStrings
// date: 7/2022
// description: Determine how many threads a server can use running a specific script

export async function main(ns) {
	var hostname = ns.args[0]
	var script = ns.args[1]
	var scriptRam = ns.getScriptRam(script)

	var threads = 0
	let free_ram = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)

	threads = free_ram / scriptRam
	ns.tprint("## Can operate ", script, " with threads: ",threads, " ##")
	return Math.floor(threads)
}