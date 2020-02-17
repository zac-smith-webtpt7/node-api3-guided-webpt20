exports.up = async function(knex) {
	await knex.schema.createTable("hubs", tbl => {
		tbl.increments()
		tbl.string("name").notNullable()
		tbl.timestamps(true, true)
		tbl.unique("name")
	})

	await knex.schema.createTable("messages", tbl => {
		tbl.increments()
		tbl.string("sender").notNullable().index()
		tbl.text("text").notNullable()
		tbl.timestamps(true, true)
		tbl
			.integer("hub_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("hubs")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("messages")
	await knex.schema.dropTableIfExists("hubs")
}
