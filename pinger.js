const osc = require('oscsocket');

class Pinger
{
    socket_ = null;
    intervalId_ = null;

    constructor(socket)
    {
        this.socket_ = socket;
    }

    start()
    {
        this.intervalId_ = setInterval(()=> {
            let msg = new osc.OSCMessage();
            msg.address = "/spatcon/connected";
            msg.addArgument("i", 1);
            this.socket_.send(msg, 7001, "127.0.0.1");
        }, 1000);
    }

    stop()
    {
        clearInterval(this.intervalId_);
    }
}

module.exports.Pinger = Pinger;