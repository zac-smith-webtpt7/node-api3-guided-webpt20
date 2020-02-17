exports.seed = async function(knex) {
	await knex("messages").truncate()
	await knex("hubs").truncate()
}
