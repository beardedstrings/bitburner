/** @param {NS} ns */

// Author: BeardedStrings
// Description: Moves all basic hack tool scripts to a target server
// Example usage: run move_hackTools.js targetServerName


export async function main(ns) {
	    var target = ns.args[0];
        await ns.scp("wgh.js", target)
        await ns.scp("hack.js", target)
        await ns.scp("weak.js", target)
        await ns.scp("grow.js", target)
        await ns.scp("opti_all.js", target)
}