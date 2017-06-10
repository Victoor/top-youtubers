
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

    self.position = 0;
    self.url = "";
    self.name = name;
    self.id = id;
    self.subscribersCount = 0;

    self.getHTMLElement = function() {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td class='position'>" + self.position + "</td>" +
            "<td class='name'><a target='_blank' href='" + self.url + "'>"+self.name+"</a></td>" +
            "<td class='sub-count' data-channel-id='" + self.id + "'>" + self.subscribersCount.formatMoney(0, ',', '.') + "</td>";

        return trElement;
    }

    self.getSubcribersCount = function () {
        var apiKey = (new APIkeys()).getRandomKey();
        var field = "forUsername";

        if (self.id.startsWith("UC")) {
            field = "id";
        }

        var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&" + field + "=" + self.id +  "&key=" + apiKey;

        return new Promise(function(success) {
            getText(url, function(e) {
                e = JSON.parse(e);
                console.log(e);
                if (e.items[0]) {
                    self.subscribersCount = e.items[0].statistics.subscriberCount;
                    self.url = "https://www.youtube.com/channel/" + e.items[0].id;
                }

                success(self);
            });
        });
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

    self.calculateChannelSubscribers = function () {
        return new Promise(function(success) {
            var totalChannels = self.list.length;
            var procesedChannels = 0;

            self.list.forEach(function (channel, index) {
                channel.getSubcribersCount().then(function (channel) {
                    self.list[index] = channel;
                    procesedChannels = procesedChannels + 1;

                    if (procesedChannels == totalChannels) {
                        success();
                    }
                });
            });
        });
    }

    self.printList = function () {
        self.list.forEach(function (channel, index) {
            channel.position = index + 1;
            self.targetElement.appendChild(channel.getHTMLElement());
        });
    };

    self.sortList = function () {
        self.list.sort(function(a, b) {
            return b.subscribersCount - a.subscribersCount;
        });
    }
}

function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(request.responseText);
            } else {
                callback("nex");
            }
        }
    };
    request.open('GET', url);
    request.send();
}

String.prototype.formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var channelList = new ChannelList();
channelList.addChannel(new Channel("Yuufit", "yuufitness"));
channelList.addChannel(new Channel("PowerExplosive", "powerexplosive"));
channelList.addChannel(new Channel("Sergio Peinado", "EntrenaSergioPeinado"));
channelList.addChannel(new Channel("Jesús López Trainer", "pikertrainer"));
channelList.addChannel(new Channel("Miguel Camarena Salud", "UCkU1UYWL9eRJBNdM1-u_nFA"));
channelList.addChannel(new Channel("The Fit Club", "UCIwg1IqJK0QOsz-g15JT0oQ"));
channelList.addChannel(new Channel("Imparable.tv", "UCs73lmiI_-JXj_7mjCOiPIg"));
channelList.addChannel(new Channel("Jose Alberto Benítez", "UC3o5fEgnWdpD2ytEysgitEQ"));
channelList.addChannel(new Channel("Anabel Ávila", "UCqn4DXeDNMvBxTVSmdVt6rA"));
channelList.addChannel(new Channel("ValentiEstaLoco", "UCG5IfQYv9S9HIsrICDcZaZQ"));
channelList.addChannel(new Channel("Strongman Tarrako", "UCsWZJrg5AROp7ePbBJaMZ3w"));
channelList.addChannel(new Channel("Pico de Oro", "UC4oGsbaR87FQ1b3C04ZxVwQ"));
channelList.addChannel(new Channel("The Fitness Boy", "UCb1TOrjCWjxnAomfr6n_bpQ"));
channelList.addChannel(new Channel("Gymsroka", "UCwYNZZ_xxbbuzskgIC4zGYA"));
channelList.addChannel(new Channel("Angel7Real", "UC8Yr5JK0uNVtITHJDztlH-g"));
channelList.addChannel(new Channel("Andrés Suita", "UCT9FDK_i8YKwgx1YiYs6kXA"));
channelList.addChannel(new Channel("bypatriciamg", "UC5CTU1nPoL9FlV839X3HuLw"));
channelList.addChannel(new Channel("Bilbo Team", "UCQVaq4NVn77IECuaVfNIf0Q"));
channelList.addChannel(new Channel("Carlos a lo Bestia", "UC9CgDPKHDUBbo3sF1k-syxA"));
channelList.addChannel(new Channel("Diego Cabañas", "UCYtitJG3fKVBhRb7q12t0uA"));
channelList.addChannel(new Channel("Edu Powerlifter", "UC-df71iqyizlDA-4azecDwg"));
channelList.addChannel(new Channel("El Guerrero de Hierro", "UCbMugwHYHglz4Ygz2HlBEaw"));
channelList.addChannel(new Channel("Espe Workout", "UCmH_u0HdSehq2UWxro7caKQ"));
channelList.addChannel(new Channel("Erasmus Fitness", "UCQF4-fo5ZYjOTzupgjAdFBA"));
channelList.addChannel(new Channel("FNT Life", "UCwR3xUh6D_jiYkODiy_d--w"));
channelList.addChannel(new Channel("Fon Fit", "UC3VgIKHhf1-4OfOge8V68RA"));
channelList.addChannel(new Channel("GG Lifestyle", "UCdh2n1BWaE2k1EKdZ_CPCwA"));
channelList.addChannel(new Channel("Héroe Fitness", "UCuCG6_pMdvP5GAOW7y4-Vhw"));
channelList.addChannel(new Channel("Improve Yourself", "UCMfPTnxhkjiZPwdNEEYziow"));
channelList.addChannel(new Channel("JJ MÉTODO EN FORMA", "UCp0YvSXfu357VBUrHz7-xCQ"));
channelList.addChannel(new Channel("Joan Gallardo", "UC50khKZjkq7uBGi9vgDJrJQ"));
channelList.addChannel(new Channel("Jose Molina", "UCsFDSb5TyG9wF80H6D4HrTw"));
channelList.addChannel(new Channel("La verdad sobre el Fitness", "UCwNuO_GjOQe4T2zJcjAxV7Q"));
channelList.addChannel(new Channel("Liga de los Nattys", "UCKZtkoXRPvzg-whcshtw8sg"));
channelList.addChannel(new Channel("LocuraSanaFitness", "UC-R5SDvNvWnXJNO6xi9JfbA"));
channelList.addChannel(new Channel("MagnoFit", "UCq_cts3J5xwfrfHhOYQCnwQ"));
channelList.addChannel(new Channel("MisterMarkinos", "UCncyiReDgEgCebFQuryHawg"));
channelList.addChannel(new Channel("MuEnViFitness", "UC7o-5e3cmK8R6ys8GzHG11A"));
channelList.addChannel(new Channel("PowerExplosive Team", "UCYdtVh8r60DHLXFcUqj-ywA"));
channelList.addChannel(new Channel("PressAndPull", "UCwDWtxT_9F5UfA7D34J8ixQ"));
channelList.addChannel(new Channel("Rodri Mora", "UCK-gLwtTEKtcMT3Hr8L3h7A"));
channelList.addChannel(new Channel("Rubén Cáceres", "UCy52hu6wO3BM4re-TS7reNg"));
channelList.addChannel(new Channel("Sergio Espinar", "UCm4Z5kk8WesWrIVZIKUnD2w"));
channelList.addChannel(new Channel("TonyGFitness", "UCSgafS82M70sO9mxw3nKkOA"));
channelList.addChannel(new Channel("INVICTHOR", "UConubCPNIs8pTKEmm92Gzgg"));
channelList.addChannel(new Channel("Iron Masters", "UCw8Cyw_iallmnT2o_32ojcQ"));

window.onload = function() {
    channelList.setTargetElement("#channelListTable tbody");
    channelList.calculateChannelSubscribers().then(function () {
        channelList.sortList();
        channelList.printList();
    });
}
