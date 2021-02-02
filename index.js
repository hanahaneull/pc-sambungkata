const { Plugin } = require('powercord/entities')
const { get } = require('powercord/http')

module.exports = class SambungKata extends Plugin {
  async startPlugin () {
    powercord.api.commands.registerCommand({
      command: 'sk',
      description: 'Ngecheat pas main sambung-kata :vrottt',
      usage: '{c} kata [minimal kata] [max result (default 10)]',
      executor: async args => {
        const kata = args[0]
        if (!kata)
          return {
            send: false,
            result: {
              type: 'rich',
              title: 'ERROR',
              description: 'Kamu tidak memberikan input!',
              color: Math.floor(Math.random() * 16777215)
            }
          }
        const url = `https://api.hana.uno/sk?q=${kata}&l=${args[1] || 0}`
        const res = await get(url)
        if (res.statusCode === 200) {
          let result = []
          if (res.body.length === 0)
            return {
              send: false,
              result: {
                type: 'rich',
                title: 'ERROR',
                description: `Tidak menemukan kata yang berawalan dari \`${args[0]}\``,
                color: Math.floor(Math.random() * 16777215)
              }
            }
          for (const data in res.body) {
            if (!data.word) {
              result.push(data)
              break
            }
            result.push(data.word)
          }
          return {
            send: false,
            result: {
              type: 'rich',
              title: 'Hasil',
              description: result.slice(0, args[2] || 10).join(' | '),
              color: Math.floor(Math.random() * 16777215),
              footer: { text: 'https://hana.uno/' }
            }
          }
        }
        return {
          send: false,
          result: {
            type: 'rich',
            title: 'ERROR',
            description:
              'Laporkan ini ke github\nhttps://github.com/hanahaneull/pc-sambungkata',
            color: Math.floor(Math.random() * 16777215)
          }
        }
      }
    })
  }

  pluginWillUnload () {
    powercord.api.commands.unregisterCommand('sk')
  }
}
