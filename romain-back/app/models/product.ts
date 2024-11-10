import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string | undefined

  @column()
  declare mardi: number | undefined

  @column()
  declare mercredi: number | undefined

  @column()
  declare jeudi: number | undefined

  @column()
  declare vendredi: number | undefined

  @column()
  declare samedi: number | undefined

  @column()
  declare dimanche: number | undefined

  @column()
  declare total: number | undefined

  @column()
  declare paton: number | undefined

  @column()
  declare unit: number | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
