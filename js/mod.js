let modInfo = {
	name: "Create Incremental",
	id: "nhug dkjldgsgrcinhgrv",
	author: "BanaCubed (Coding), and many people (Concepts)",
	pointsName: "$",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1024,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "Numeracy",
}

let changelog = `<h1>Changelog:</h1><br><br>
	check the forum thread Create Incremental at [galaxy.click/forum/thread/255] to see what is coming next<br><br>
	<h3>I will not make a changelog</h3><br>
		galaxy gives you the ability to view past updates so look there (if you aren't on galaxy go to [galaxy.click])`

let winText = `You are win! Congratulations on wasting your time! (Keep save for future updates)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if(player.points === null || player.points === undefined) player.points = new Decimal(0)


	// $ Layer ('U')
	if(!hasMilestone('P', 8)) {
		if (hasUpgrade('U', 11) || inChallenge('SR', 22)) gain = gain.add(1)

		if (hasUpgrade('U', 12)) gain = gain.times(4)
		if (hasUpgrade('U', 13) && !hasUpgrade('U', 23)) gain = gain.times(player.points.add(5).log(5))
		if (hasUpgrade('U', 13) && hasUpgrade('U', 23)) gain = gain.times(player.points.add(3).log(3))
		if (hasUpgrade('U', 14)) gain = gain.times(2)
		if (hasUpgrade('U', 22)) gain = gain.times(player.points.pow(1.5).add(8).log(8).pow(0.5))
		if (hasUpgrade('U', 24)) gain = gain.times(1.5)
		if (hasUpgrade('U', 31)) gain = gain.times(player.points.add(10).log(10).pow(0.5))
		if (hasUpgrade('U', 41)) gain = gain.times(10)
		if (hasUpgrade('U', 43)) gain = gain.times(player.R.points.add(10).log(10))
	}

	if(hasMilestone('P', 8)) {
		if (hasUpgrade('U', 11) || inChallenge('SR', 22)) gain = gain.add(100)

		if (hasUpgrade('U', 12)) gain = gain.times(5)
		if (hasUpgrade('U', 13) && !hasUpgrade('U', 23)) gain = gain.times(player.points.add(4.5).log(3.5))
		if (hasUpgrade('U', 13) && hasUpgrade('U', 23)) gain = gain.times(player.points.add(2.5).log(2.5))
		if (hasUpgrade('U', 14)) gain = gain.times(3)
		if (hasUpgrade('U', 22)) gain = gain.times(player.points.pow(1.55).add(7).log(7).pow(0.5))
		if (hasUpgrade('U', 24)) gain = gain.times(2)
		if (hasUpgrade('U', 31)) gain = gain.times(player.points.add(8).log(8).pow(0.5))
		if (hasUpgrade('U', 41)) gain = gain.times(1000)
		if (hasUpgrade('U', 43)) gain = gain.times(player.R.points.add(8).log(8))
	}

	if (hasUpgrade('U', 51)) gain = gain.times(player.P.points.add(1))

	// The Machine
	if(!inChallenge('SR', 22)) {
		if (getClickableState('U', 11)) gain = gain.times(4)
		if (getClickableState('U', 12)) gain = gain.times(3)
		if (getClickableState('U', 13)) gain = gain.times(2)

		let machineBoost = new Decimal(1)
		if (hasUpgrade('R', 32)) machineBoost = machineBoost.times(1.3)
		machineBoost = machineBoost.times(layers.P.effect())
		if(hasMilestone('P', 8) && hasUpgrade('U', 34)) machineBoost = machineBoost.pow(1.25)
		gain = gain.times(machineBoost)
	}

	if(!hasMilestone('P', 8)) { if (hasUpgrade('U', 21)) gain = gain.pow(1.25) }
	if(hasMilestone('P', 8)) { if (hasUpgrade('U', 21)) gain = gain.pow(1.3) }


	// Rebirth Layer
	gain = gain.times(layers.R.effect())
	if (hasUpgrade('R', 11)) gain = gain.times(5)
	if (hasUpgrade('R', 14)) gain = gain.times(2)


	// Super Rebrith Layer
	gain = gain.times(layers.SR.effect()[0])
	if (hasMilestone('SR', 9)) gain = gain.times(layers.SR.milestones[9].effect())
	if (hasMilestone('SR', 4)) gain = gain.pow(1.1)
	if (inChallenge('SR', 12)) gain = gain.pow(0.5)
	if (inChallenge('SR', 31)) gain = gain.div(player.SR.tax)


	// Hyper Rebirth Layer
	gain = gain.times(layers.HC.effect()[0])
	gain = gain.pow(layers.C.effect())


	// Dunno were else to put this

	everyTick();

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	
]



// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('SR', 21)
}

function machineBonuses() {
	let bonus = new Decimal(1);
	if(hasUpgrade('R', 32)) bonus = bonus.times(1.3);
	bonus = bonus.times(layers.P.effect())
	return bonus
}

function everyTick() {
	// meh
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function achievement33() {
	// Variable setup
	let machinemodes = 0

	// Total modes selected
	if (getClickableState('U', 11) === true) machinemodes = machinemodes + 1
	if (getClickableState('U', 12) === true) machinemodes = machinemodes + 1
	if (getClickableState('U', 13) === true) machinemodes = machinemodes + 1

	// >= 2 return true
	if (machinemodes >= 2) return true; else return false
}
