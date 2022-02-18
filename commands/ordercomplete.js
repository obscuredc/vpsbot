const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ordercomplete')
        .setDescription('complete an order')
        .addIntegerOption(option => option.setName('ordernumber').setDescription('the number of the order that was completed')),
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.

        if (!interaction.member.roles.cache.some(role => role.id == "943979162731966545")) return interaction.reply({ content: "you must have the deliverant role to do this command!" })

        let order = dat.fetchOrder(interaction.options.getInteger('ordernumber')) == undefined ? false : dat.fetchOrder(interaction.options.getInteger('ordernumber'))
        if (order == false) return interaction.reply({ content: "that order doesn't exist!" })
        if (order.status != "claimed") return interaction.reply({ content: "that order is already completed, not claimed, or failed" })

        order.status = "completed";

        return
    },
};