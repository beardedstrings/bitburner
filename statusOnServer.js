/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    ns.print(target)
    ns.getServerRequiredHackingLevel(target);   
    ns.getServerMoneyAvailable(target);
    ns.getServerSecurityLevel(target);
    ns.getServerMaxMoney(target);
    ns.getServerMinSecurityLevel(target);
    ns.print("");
}