'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.senha) {
        userInstance.senha = await Hash.make(userInstance.senha)
      }
    })
  }

  //tipo - 'master' | 'admin' | 'operator'

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  empresa() {
    return this.belongsTo('App/Models/Empresa')
  }

  locais() {
    return this.belongsToMany('App/Models/Local').pivotTable('local_usuario').withTimestamps()
  }
}

module.exports = User
