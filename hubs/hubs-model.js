const knex = require("knex")
const db = require("../data/config")

module.exports = {
	find,
	findById,
	add,
	remove,
	update,
	findHubMessages,
	findHubMessageById,
	addHubMessage,
}

function find(query = {}) {
	const { page = 1, limit = 100, sortBy = "id", sortDir = "asc" } = query
	const offset = limit * (page - 1)

	return db("hubs")
		.orderBy(sortBy, sortDir)
		.limit(limit)
		.offset(offset)
		.select()
}

function findById(id) {
	return db("hubs")
		.where({ id })
		.first()
}

async function add(hub) {
	const [id] = await db("hubs").insert(hub)

	return findById(id)
}

function remove(id) {
	return db("hubs")
		.where({ id })
		.del()
}

async function update(id, changes) {
	await db("hubs")
		.where({ id })
		.update(changes)

	return findById(id)
}

function findHubMessages(hubId) {
	return db("messages as m")
		.join("hubs as h", "m.hub_id", "h.id")
		.where({ hub_id: hubId })
		.select(["m.id", "m.text", "m.sender", "h.id as hubId", "h.name as hub"])
}

function findHubMessageById(hubId, id) {
	return db("messages")
		.where({ id, hub_id: hubId })
		.first()
}

async function addHubMessage(hubId, message) {
	const data = { hub_id: hubId, ...message }
	const [id] = await db("messages").insert(data)

	return findHubMessageById(hubId, id)
}