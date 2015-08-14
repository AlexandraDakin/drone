var Cylon = require('cylon');
var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
connection: "ardrone"
})

    .on("ready", fly);
    
// Fly the bot

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();

    bot.nav.on("navdata", function(data) {
        console.log(data);
    });

     // Take off
    bot.drone.takeoff();

    after(9*1000, function() {
        bot.drone.left(0.2);
    });
    after(12*1000, function() {
        bot.drone.left(0);
    });

    after(15*1000,function() {
        bot.drone.land();
    });

    after(18*1000, function() {
        bot.drone.stop();
    });

}

Cylon.start();
