
// Settings
var baseURL = "/";
var APIkeys = ["AIzaSyC0QYUSKEwHaRVz4NKpT1SLbkVMT1o5cM8", "AIzaSyBSyBp1KHjjXox6e9FBPoOCE1mbLvVUzUM", "AIzaSyDeLLOyrp1yCZCOmVXg3u8Jxtasre2NxFA", "AIzaSyDFXBcpYskzYNTOZEgq133xXP5GUH4Ct3k", "AIzaSyBRnIik08vLUsSyJs_M_A7eMRgxaBMRpdU", "AIzaSyD_HMEbLyCOVPB53JBFRS5--58sAwhY2Ic", "AIzaSyA50UgQA00oM7ztJp97nWC7XM9nggeGP8g", "AIzaSyAwOwvwAGbUF2xTmsJY7Loyrg8qE-0syQE", "AIzaSyDxkDsPPEgePGoyZct62M0MdYDBRzuudKY", "AIzaSyA1v68XzPdA9rfrsPUFhgZ500_uWdf2A8I", "AIzaSyCb9zxTIuGGEBIJHLfj8lOb4k4U0jWstGg", "AIzaSyBgiHBx5C-rkWzY0w2c7SWUC-RHyRpLv7E", "AIzaSyDi5W8BNEZRYCkiuV-rSLWzlfDOIwEitjw", "AIzaSyAfdtlCGsypBhW1Fzs3zMmYcUDgkNBTDV8", "AIzaSyBraMJy98X7r9-jPRznAaT1g9cdAAFQyFE", "AIzaSyCg_tlHelOnRsDjfdv-3Kntb3GXaYEXzk4", "AIzaSyAI0sPgCpm_KjEL7u5hI3m0pin0mBZbnLs", "AIzaSyDqipNMKLaN_ZVbZ-_f40YFp_vUTmhqMxU", "AIzaSyCzF4_POQGk2U_0TiaGF0ZqDMHIsqGA7es", "AIzaSyCgCBendo5K3kPNEL9tO_TI4G8WAdp_hnM", "AIzaSyAhXueAQP-HfZdLtoY9Tlxqt9zzc7yTrTg", "AIzaSyBUnyRp5Ny6HKeRUx8nGGAuL6r8BlUsqIU", "AIzaSyBQI0zBPcDO3cZ8eC87SlxKaW7hNRa4C4M", "AIzaSyDTMVk7NSV8Q99zMhoIDboFcxdnaWPPOJw", "AIzaSyD6Uemb2sRhUROLLVDVs7e3NaOt-OQL9qg", "AIzaSyBVRPMx0qg7LfN_Npyw2dnB0xp_-94_0RQ", "AIzaSyC2iAZe084ALcwvBRN6hEZoxPJL0qBZA74", "AIzaSyDX5oy6l5rHCyphGqHFvgn9jAFg3xtXHE0", "AIzaSyAmkhGStJ5IZU-iy6ZitzFhjnv4nTQUH5E", "AIzaSyC5s4T8io7GZyHEngZBLQZeUeLjxNLGsV0", "AIzaSyBNCnqvTheMz1VHFP_r1MdAny-5P3LUPcs", "AIzaSyBIWb6M2iUewOO08FQftyvq48N8MluKKOo", "AIzaSyCnDPYzmv3gMqx4WYh4J6e5t5NzVoGH2gk"];

function Channel(name, id) {
    this.name = name;
    this.id = id;

    this.getHTMLElement = function() {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td class='position'></td>" +
            "<td class='name'>"+this.name+"</td>" +
            "<td class='sub-count'></td>";

        return trElement;
    }
}

function ChannelList() {
    self = this;

    self.list = [];
    self.setTargetElement = function (query) {
        self.targetElement = document.querySelector(query);
    }

    self.addChannel = function(channel) {
        self.list.push(channel);
    }

    self.printList = function() {
        console.log(self.targetElement);

        self.list.forEach(function (channel) {
            self.targetElement.appendChild(channel.getHTMLElement());
        });
    }
}


var channelList = new ChannelList();
channelList.addChannel(new Channel("Yuufit", "yuufitness"));
channelList.addChannel(new Channel("PowerExplosive", "powerexplosive"));
channelList.addChannel(new Channel("Sergio Peinado", "sergiopeinadotrainer"));

window.onload = function() {
    channelList.setTargetElement("#channelListTable tbody");
    channelList.printList();
}
