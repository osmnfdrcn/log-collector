const CollectorService = require('./Collector')

const collector = new CollectorService()

collector.on("message", (log) => {
  console.log(`
  DATE : ${log.date},
  SENDER : ${log.host},
  LOG : ${log.message}
  `)
})

// https://nodejs.org/api/dgram.html#dgram_socket_bind_options_callback
collector.start()
