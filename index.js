const { Plugin } = require('powercord/entities')

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
        const kbbi = require('./kbbi.json')
        const word = kbbi.filter(x => x.startsWith(args[0]) && x.length > (args[1] || 0)).sort((a, b) => b.length - a.length)
        return {
          send: false,
          result: {
            type: 'rich',
            title: 'Hasil',
            description: word.slice(0, args[2] || 10).join(' **|** '),
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
