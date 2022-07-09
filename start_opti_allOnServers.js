
export async function main(ns) {
    let servers = [];

    let serversToScan = ns.scan("home");

    while (serversToScan.length > 0) {
        let server = serversToScan.shift();
        // Filter out servers, find root access, pwned, has money, 
        if (!servers.includes(server) && server !== "home" && ns.hasRootAccess(server) && ns.getServerMaxMoney(server) == 0 && ns.getServerRequiredHackingLevel(server) == 1) {
            servers.push(server);
            serversToScan = serversToScan.concat(ns.scan(server));
        }
    }

    for (let server of servers) {
        if(!ns.scriptRunning("opti_all.js", server)){
            ns.exec("opti_all.js", 'home', 1, server)
            ns.print("Starting opti_all.js on " + server);
        }
        // if opti all is not running start on this server start it
    }



}