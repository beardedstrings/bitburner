function scriptCheckAndSend(ns, server, script) {
    if (!ns.fileExists(script, server)) {
        ns.scp(script, server)
        ns.tprint("Sent " + script + " to " + server)
    }
    return
}

function startScript(ns, server, script) {
    var scriptRam = ns.getScriptRam("wgh.js") // Reports RAM required to run
    var threads = 0
    let free_ram = ns.getServerMaxRam(server) - ns.getServerUsedRam(server)
    threads = free_ram / scriptRam // how many threads can we run

    if (!ns.scriptRunning("wgh.js", server) && threads > 0 && ns.hasRootAccess("n00dles")) {
        ns.tprint("Attempting to start", "wgh.js", " on: ", server)
        ns.tprint("## Can operate ", "wgh.js", " with threads: ", Math.floor(threads), " ##")
        var startThreads = Math.floor(threads)
        ns.exec("wgh.js", server, startThreads, "n00dles");
    }

}

export async function main(ns) {
    let servers = ["n00dles", "foodnstuff"]
    for (let server in servers) {
        if (!ns.hasRootAccess(server)) {
            ns.nuke(server)
            scriptCheckAndSend(ns, server, "wgh.js")
            startScript(ns, server, "wgh.js")
        } else {
            scriptCheckAndSend(ns, server, "wgh.js")
            startScript(ns, server, "wgh.js")
        }
    }
}




