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
        bot.drone.left(0.05);
    });

    after(12*1000, function() {
        bot.drone.left(0);
        bot.drone.hover();
    });

    after(17*1000, function() {
        bot.drone.forward(0.05);
    });

    after(20 *1000, function() {
        bot.drone.forward(0);
        bot.drone.hover();
    });


    after(25 *1000, function() {
        bot.drone.right(0.05);
    });

    after(28 *1000, function() {
        bot.drone.right(0);
        bot.drone.hover();
    });

    after(33 *1000, function() {
        bot.drone.back(0.05);
    });

    after(36 *1000, function() {
        bot.drone.back(0);
        bot.drone.hover();
    });

    after(41*1000,function() {
        bot.drone.land();
    });

    after(45*1000, function() {
        bot.drone.stop();
    });

}

Cylon.start();
