const { MessageEmbed } = require("discord.js")

let orders = [];
let id = 0;

class Order {
    constructor(isPremium, isMarket, toX, toZ, fromX, fromZ, toPlayerName, fromPlayerName) {
        this.isPremium = isPremium;
        this.isMarket = isMarket;
        this.toX = toX;
        this.toZ = toZ;
        this.fromX = fromX;
        this.fromZ = fromZ;
        this.toPlayerName = toPlayerName;
        this.fromPlayerName = fromPlayerName;
        this.status = "pending";
        this.claimedby = "Nobody";

        this.id = id + 0;
        id++;
    }
    toEmbed() {
        return new MessageEmbed().setTitle("Order No." + this.id).addFields([
            {
                name: "isPremium",
                value: (this.isPremium ? "True" : "False"),
                inline: true
            },
            {
                name: "isMarket",
                value: (this.isMarket ? "True" : "False"),
                inline: true
            },
            {
                name: "deliver to:",
                value: `Name: ${this.toPlayerName} or at (${this.toX}, y, ${this.toZ})`,
                inline: true
            },
            {
                name: "pickup from:",
                value: `Name: ${this.fromPlayerName} or at (${this.fromX}, y, ${this.fromZ})`,
                inline: true
            },
            {
                name: "status",
                value: this.status,
                inline: true
            },
            {
                name: "claimed by",
                value: this.claimedby,
                inline: true
            }
        ]).setColor(this.getEmbedColor())
    }
    getEmbedColor() {
        switch(this.status) {
            case "pending":
                return "000000";
            case "complete":
                return "79B83A";
            case "failed":
                return "D72020";
            case "claimed":
                return "79B83A";
        }
    }
    isClaimed() {
        return this.claimedby == "Nobody" ? false : true;
    }
}

module.exports = {
    Order: Order,
    addOrder: function(O) {
        orders.push(O);
    },
    fetchOrder: function(id) {
        return orders.find(Order => Order.id == id);
    },
    fetchAllOrders: function() {
        return orders;
    }
}