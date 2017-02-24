# rasp-iot-bot
During a IoT lecture in my MBA in Big Data class my group and I was challenged to create a solution to send a command via Facebook Messenger Bot to a device (Raspberry Pi) that would be responsible to turnon and turnoff a lights in our lab. The idea for a Big Data class was create data that we could use to create Dashboards and make decisions, so the first solution include a [Firebase DB](https://firebase.google.com/docs/database/) and a [Microsoft PowerBI](https://msit.powerbi.com) dashboard, you can check the code prepared to work with Firebase in the branch **FIAP** I decide to keep a clean and small version to make this easier to people.

<p align="center"><img src="https://dl.dropboxusercontent.com/s/yltx62pbv5tktu7/Screen%20Shot%202017-02-24%20at%2016.39.29.png"Projects"></p>

- Solution works in a Raspberry Pi running [Raspian as OS](https://www.raspbian.org/);
- The platform used to develop the application is Javascript in the server side, by default Raspian supports [NodeJS](https://nodejs.org/), so that is no problem to run the code directly on the device..
- Different for other solutions, this solution running the code in the device need be accessible from Internet (to be accessed by Messenger), to do this we run [Ngrok](https://ngrok.com/) to create an HTTP tunnel.



Enjoy! :)
