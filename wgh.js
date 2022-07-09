/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target); // lower security
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target); // spoof money
        } else {
            await ns.hack(target); // steal money
        }
    }
}