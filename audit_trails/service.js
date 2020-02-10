
await db.sequelize.transaction(transaction => {
  const options = {
    trackOptions: {
      user_id: admin.id,
      role: 'admin'
    },
    transaction: transaction
  }
  return Admins.create(params, options)
})

const result = await db.sequelize.transaction(transaction => {
  return TenantUsers.update(updateBody, {
    where: {
      id: id
    },
    trackOptions: {
      target_id: id,
      user_id: admin.id,
      role: 'admin',
      previousData: getPreviousData(updateBody, tenantUser)
    },
    transaction
  })
})

const [result] = await db.sequelize.transaction(transaction => {
  return Promise.all([
    TenantUsers.destroy({ where: { id: id },
      trackOptions: {
        target_id: id,
        user_id: admin.id,
        role: 'admin',
        previousData: tenantUser.dataValues
      },
      transaction }),
    TenantUserUnits.destroy({ where: { tenant_user_id: id },
      trackOptions: {
        target_id: id,
        user_id: admin.id,
        role: 'admin'
      },
      transaction }),
    TenantUserInvites.destroy({ where: { tenant_user_id: id },
      trackOptions: {
        target_id: id,
        user_id: admin.id,
        role: 'admin'
      },
      transaction })
  ])
})
