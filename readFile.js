/** @param {NS} ns */


export async function main(ns) {
  var serverlist = JSON.parse(ns.read("serverlist.txt"));
  //ns.tprint(serverlist)
  ns.print(serverlist)
  //for (let server of serverlist) {
    //ns.tprint(server)
    //ns.print("SERVER:")
    //ns.print(server)
    //ns.getServerSecurityLevel(server)
  //}

  //ns.print(serverlist);
}