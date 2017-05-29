
// Settings
var baseURL = "/";
function APIkeys() {
    var self = this;
    self.keys = ["AIzaSyAKiZc40ES3unQ-8owDC197QbSK-nJKrmE"];

    self.getRandomKey = function () {
        return self.keys[Math.floor(Math.random()*self.keys.length)];
    }
}

function Channel(name, id) {
    var self = this;

    self.name = name;
    self.id = id;
    self.subscribersCount = 0;

    self.getHTMLElement = function() {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td class='position'></td>" +
            "<td class='name'>"+self.name+"</td>" +
            "<td class='sub-count' data-channel-id='" + self.id + "'>" + self.subscribersCount + "</td>";

        return trElement;
    }

    self.getSubcribersCount = function () {
        var apiKey = (new APIkeys()).getRandomKey();
        var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" + self.id +  "&key=" + apiKey;

        getText(url, function(e) {
            e = JSON.parse(e);
            if (e.items[0]) {
                self.setSubscribersCount(e.items[0].statistics.subscriberCount);
            }
        });
    }

    self.setSubscribersCount = function (count) {
        self.subscribersCount = count;

    }
}

function ChannelList() {
    var self = this;

    self.list = [];
    self.setTargetElement = function (query) {
        self.targetElement = document.querySelector(query);
    }

    self.addChannel = function(channel) {
        self.list.push(channel);
    }

    self.printList = function() {
        self.list.forEach(function (channel, index) {
            channel.getSubcribersCount();
            self.targetElement.appendChild(channel.getHTMLElement());

            self.list[index] = channel;
        });
    }
}

function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) callback(request.responseText);
            else {
                callback("nex");
            }
        }
    };
    request.open('GET', url);
    request.send();
}

var channelList = new ChannelList();
channelList.addChannel(new Channel("Yuufit", "yuufitness"));
channelList.addChannel(new Channel("PowerExplosive", "powerexplosive"));
channelList.addChannel(new Channel("Sergio Peinado", "sergiopeinadotrainer"));

window.onload = function() {
    channelList.setTargetElement("#channelListTable tbody");
    channelList.printList();
}
