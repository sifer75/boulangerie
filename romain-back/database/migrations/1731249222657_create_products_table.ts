import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').nullable()
      table.integer('mardi').nullable()
      table.integer('mercredi').nullable()
      table.integer('jeudi').nullable()
      table.integer('vendredi').nullable()
      table.integer('samedi').nullable()
      table.integer('dimanche').nullable()
      table.integer('total').nullable()
      table.integer('paton').nullable()
      table.integer('unit').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
