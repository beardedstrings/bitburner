/** @param {NS} ns */

// Purchase server(s) 
// 

// ServerName - RAM 
/*
: Max RAM: 1048576
2 Pow  Cost       RAM 
: 1 -- 110,000 RAM: 2
: 2 -- 220,000 RAM: 4
: 3 -- 440,000 RAM: 8
: 4 -- 880,000 RAM: 16
: 5 -- 1,760,000 RAM: 32
: 6 -- 3,520,000 RAM: 64
: 7 -- 7,040,000 RAM: 128
: 8 -- 14,080,000 RAM: 256
: 9 -- 28,160,000 RAM: 512
: 10 -- 56,320,000 RAM: 1,024
: 11 -- 112,640,000 RAM: 2,048
: 12 -- 225,280,000 RAM: 4,096
: 13 -- 450,560,000 RAM: 8,192
: 14 -- 901,120,000 RAM: 16,384
: 15 -- 1,802,240,000 RAM: 32,768
: 16 -- 3,604,480,000 RAM: 65,536
: 17 -- 7,208,960,000 RAM: 131,072
: 18 -- 14,417,920,000 RAM: 262,144
: 19 -- 28,835,840,000 RAM: 524,288
: 20 -- 57,671,680,000 RAM: 1,048,576
 */

export async function main(ns) {
	var serverName = ns.args[0]
	var ram = ns.args[1];

	ns.purchaseServer(serverName, ram);
}