# rasp-iot-bot
During a IoT lecture in my Big Data course my group and I was challenge to create a solution to send a command via Messenger Bot to a device (Raspberry Pi) that would be responsible to turno and turnoff a lightbulb in our lab.

Stack
----------
In a MBA Big Data course we should create data that we could use to create Dashboards and make decisions, so the first solution include a Firebase DB and a PowerBI interface, you can check the code prepared to work with Firebase in the branch **FIAP** I decide to keep a clean and small version to make this easier to people.

<p align="center"><img src="https://dl.dropboxusercontent.com/s/yltx62pbv5tktu7/Screen%20Shot%202017-02-24%20at%2016.39.29.png"Projects"></p>

- Solution works in a Raspberry Pi running Raspian as OS;
- The platform used to develop the application is Javascript in the server side, by default Raspian supports NodeJS, so that is np.
- 



Used by
----------
I've created a repository (also forked from a good idea) to config my machine called [pedrocesar-ti/machine](https://github.com/pedrocesar-ti/machine), and there I guarantee the installation of all tools needed and copy vimfiles installation, even if you are in a MacOSX or a Debian bassed Linux.

##Installing
```console
$ wget https://github.com/pedrocesar-ti/vimfiles/archive/master.zip
$ unzip master.zip
$ cd vimfiles-master/
$ ./setup.sh
```

Enjoy! :)
