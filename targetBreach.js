/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    ns.tprint("Performing breach protocol on ", target)
    // Port Crackers
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.tprint("SSH bruted")
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
        ns.nuke(target)
        ns.tprint("Obtained root on ", target)
        await ns.scp("targetBreach.js", target)
        await ns.scp("wgh.js", target)
    }
    else {
        await ns.scp("targetBreach.js", target)
        if (ns.fileExists("targetBreach.js")) {
            ns.tprint("Target Breach send over")
        }
        await ns.scp("wgh.js", target)
        await ns.scp("hack.js", target)
        await ns.scp("weak.js", target)
        await ns.scp("grow.js", target)
        await ns.scp("bit_miner.js", target)
        if (ns.fileExists("wgh.js")) {
            ns.tprint("wgh send over")
        }

    }
    ns.tprint("Completed running Breach protocol on ", target)
}