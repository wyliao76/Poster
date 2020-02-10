
const AuditTrail = async (model, sequelize, DataTypes, option) => {
  const modelName = option.modelName
  const audit_trails = sequelize.define(
    'audit_trails',
    {
      model: DataTypes.STRING,
      action: DataTypes.STRING,
      target_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      role: DataTypes.STRING,
      previous_data: DataTypes.TEXT,
      metadata: DataTypes.TEXT
    },
    option
  )

  const createHook = (instance, options) => {
    // console.log('createHook', instance)
    // console.log('options', options)
    const { user_id = null, role = null } = options.trackOptions
    const object = {
      model: modelName,
      action: 'create',
      user_id: user_id,
      role: role,
      metadata: JSON.stringify(instance.dataValues) || ''
      // user_id: instance.created_by_tenant_user_id || instance.created_by_admin_id || instance.created_by || null,
      // previous_data: JSON.stringify(instance._previousDataValues) || '',
    }
    // console.log(object)
    return audit_trails.create(object, { transaction: options.transaction })
  }

  const createBulkHook = (instance, options) => {
    // console.log('createBulkHook', instance)
    // console.log('options', options)
    const { user_id = null, role = null } = options.trackOptions
    const data = instance.map(data => data.dataValues)
    const object = {
      model: modelName,
      action: 'bulkCreate',
      user_id: user_id,
      role: role,
      metadata: JSON.stringify(data) || ''
      // user_id: data[0].created_by_tenant_user_id || data[0].created_by_admin_id || data[0].created_by || null,
      // previous_data: JSON.stringify(instance._previousDataValues) || '',
    }
    // console.log(object)
    return audit_trails.create(object, { transaction: instance.transaction })
  }

  const updateHook = (instance) => {
    // console.log('beforeUpdate: ', instance)
    const { target_id = null, user_id = null, role = null, previousData = null } = instance.trackOptions
    const object = {
      model: modelName,
      action: 'update',
      target_id: Number(target_id),
      user_id: Number(user_id),
      role: role,
      previous_data: JSON.stringify(previousData),
      metadata: JSON.stringify(instance.attributes)
      // target_id: Number(instance.where.id),
      // user_id: instance.trackOptions.user_id,
      // previous_data: JSON.stringify(instance.trackOptions.previousData),
      // model: instance.model,
      // action: instance.type.toLowerCase(),
    }
    // console.log(object)
    return audit_trails.create(object, { transaction: instance.transaction })
  }

  const updateBulkHook = async (instance) => {
    // const data = await model.findOne({
    //   where: instance.where
    // })
    // console.log(data)
    // console.log('beforeBulkUpdate: ', instance)
    const { target_id = null, user_id = null, role = null, previousData = null } = instance.trackOptions
    const object = {
      model: modelName,
      action: 'bulkUpdate',
      target_id: Number(target_id),
      user_id: Number(user_id),
      role: role,
      previous_data: JSON.stringify(previousData),
      metadata: JSON.stringify(instance.attributes)
      // model: instance.model,
      // action: instance.type.toLowerCase(),
      // target_id: Number(instance.where.id),
      // user_id: instance.trackOptions.user_id,
      // previous_data: JSON.stringify(instance.trackOptions.previousData),
      // created_at: new Date()
    }
    // console.log(object)
    await audit_trails.create(object, { transaction: instance.transaction })
  }

  const deleteHook = (instance) => {
    // console.log('deleteHook', instance)
    const { target_id = null, user_id = null, role = null, previousData } = instance.trackOptions
    const object = {
      model: modelName,
      action: 'delete',
      target_id: Number(target_id),
      user_id: Number(user_id),
      role: role,
      previous_data: JSON.stringify(previousData) || null
      // user_id: data[0].created_by_tenant_user_id || data[0].created_by_admin_id || data[0].created_by || null,
      // previous_data: JSON.stringify(instance._previousDataValues) || '',
    }
    return audit_trails.create(object, { transaction: instance.transaction })
  }

  const deleteBulkHook = async (instance, options) => {
    // console.log('deleteBulkHook', instance)
    const { target_id = null, user_id = null, role = null, previousData } = instance.trackOptions
    const object = {
      model: modelName,
      action: 'bulkDelete',
      target_id: Number(target_id),
      user_id: Number(user_id),
      role: role,
      previous_data: JSON.stringify(previousData) || null
      // target_id: Number(instance.trackOptions.target_id),
      // action: instance.type.toLowerCase(),
      // target_id: Number(instance.where[Object.keys(instance.where)[0]]),
      // user_id: instance.trackOptions.user_id,
      // previous_data: JSON.stringify(instance.trackOptions.previousData) || '',
    }
    // console.log(object)
    return audit_trails.create(object, { transaction: instance.transaction })
  }

  model.addHook('afterCreate', createHook)
  model.addHook('afterBulkCreate', createBulkHook)
  model.addHook('beforeUpdate', updateHook)
  model.addHook('beforeBulkUpdate', updateBulkHook)
  model.addHook('beforeDestroy', deleteHook)
  model.addHook('beforeBulkDestroy', deleteBulkHook)

  // model.beforeBulkUpdate(async (instance) => {
  //   const data = await model.findOne({
  //     where: instance.where
  //   })
  //   console.log(data)
  //   console.log('beforeBulkUpdate: ', instance)
  //   const object = {
  //     model: modelName,
  //     // model: instance.model,
  //     action: instance.type.toLowerCase(),
  //     target_id: Number(instance.where.id),
  //     user_id: instance.trackOptions.user_id,
  //     previous_data: JSON.stringify(instance.trackOptions.previousData),
  //     metadata: JSON.stringify(instance.attributes)
  //     // created_at: new Date()
  //   }
  //   console.log(object)
  //   await audit_trails.create(object, { transaction: instance.transaction })
  // })
}

module.exports = AuditTrail
