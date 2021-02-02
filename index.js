const { Plugin } = require('powercord/entities')
const { get } = require('powercord/http')

module.exports = class SambungKata extends Plugin {
  async startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'sk',
      description: 'Ngecheat pas main sambung-kata :vrottt',
      usage: '{c} kata [minimal kata]',
      executor: async args => {
        const kata = args[0]
        if (!kata)
          return {
            send: false,
            result: 'Masukkan kata untuk dicari!'
          }
        const url = `https://api.hana.uno/sk?q=${kata}&l=${args[1] || 0}`
        const res = await get(url)
        if (res.statusCode === 200) {
          let result = []
          if (res.body === result) return {
            send: false,
            result: {
              type: 'rich',
              title: 'ERROR',
              description: `Tidak menemukan kata yang berawalan dari \`${args[0]}\``,
              color: Math.floor(Math.random() * 16777215),
            }
          }
          res.body.forEach(x => result.push(`**${x.word}**`))
          return {
            send: false,
            result: {
              type: 'rich',
              title: 'Hasil',
              description: result.join(' | '),
              color: Math.floor(Math.random() * 16777215),
              footer: {
                text: 'https://hana.uno/'
              }
            }
          }
        }
        return {
          send: false,
          result: {
            type: 'rich',
            title: 'ERROR',
            description: 'Kamu tidak memberikan input!',
            color: Math.floor(Math.random() * 16777215)
          }
        }
      }
    })
  }
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('sk')
  }
}
