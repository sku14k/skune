module.exports = {
  name: 'bal',
  description: 'gets the balance of a user',
  execute(message, args, db, Discord) {
    if(db.get(`user_${message.author.id}.bal`) === null) {
      message.reply({
        embed: {
          color: '#679ad8',
          description: `Та эхлээд банканд данс нээлгэх ёстой. ${prefix}start гэж бичсэнээр данс нээгдэнэ.`,
          footer: {
            text: "© 2021. 14K"
          }
        }
      })
    } else {
      let bal = db.get(`user_${message.author.id}.bal`)

      message.reply({
        embed: {
          color: '#679ad8',
          description: `\`\`\`Танд ${bal} skune зоос байна.\`\`\``,
          footer: {
            text: "© 2021. 14K"
          }
        }
      })
    }
  }
}