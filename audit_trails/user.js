'use strict'
/* global SERVICES_PATH */

module.exports = (sequelize, DataTypes) => {
  const options = {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  const admins = sequelize.define('admins', {
    role: DataTypes.STRING,
    invited_at: DataTypes.DATE,
    created_by: DataTypes.STRING,
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    status: DataTypes.STRING, // init, active, inactive
    last_sign_in_at: DataTypes.DATE
  }, options)
  admins.associate = (models) => {
    admins.hasMany(models.audit_trails, {
      foreignKey: 'user_id'
    })
  }
  const AuditTrail = require(`${SERVICES_PATH}/audit_trail`)
  AuditTrail(admins, sequelize, DataTypes, options)
  return admins
}
