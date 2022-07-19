const dgram = require("dgram")
const EventEmitter = require("events")

class CollectorService extends EventEmitter {

  constructor() {
    super()
    this.socket = null
  }

  // Def syslog port
  start(options = { port: 514, address: "0.0.0.0", exclusive: true }, cb) {
    return new Promise((resolve, reject) => {
      if (this.isRunning()) {
        let errorObject = createErrorObject(null, "Collector Service already running!")
        if (cb) cb(errorObject, this)
        reject(errorObject)
      } else {
        this.socket = dgram.createSocket("udp4")

        // Socket listening handler
        this.socket.on("listening", () => {
          this.emit("start", this)
          if (cb) cb(null, this)
          resolve(this)
        })

        // Socket error handler
        this.socket.on("error", (err) => {
          this.emit("error", err)
        })

        // Socket message handler
        this.socket.on("message", (msg, remote) => {
          let message = {
            date: new Date(),
            host: remote.address,
            message: msg.toString("utf8"),
            protocol: remote.family
          }
          this.emit("message", message)
        })

        // Socket close handler
        this.socket.on("close", () => {
          this.emit("stop")
        })

        this.socket.bind(options, (err) => {
          if (err) {
            let errorObject = createErrorObject(err, "NodeJS Syslog Server failed to start!")
            if (cb) return cb(errorObject, this)
            return reject(errorObject)
          }
        })
      }
    })
  }

  stop(cb) {
    return new Promise((resolve, reject) => {
      try {
        this.socket.close(() => {
          this.socket = null
          if (cb) return cb(null, this)
          return resolve(this)
        })
      } catch (err) {
        let errorObject = createErrorObject(err, "NodeJS Syslog Server is not running!")
        if (cb) return cb(errorObject, this)
        return reject(errorObject)
      }
    })
  }

  isRunning() {
    return (this.socket !== null)
  }
}

function createErrorObject(err, message) {
  return {
    date: new Date(),
    error: err,
    message: message
  }
}

module.exports = CollectorService