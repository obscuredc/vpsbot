const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('get help with placing an order and costs'),
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.

        let helpEmbed = new MessageEmbed()
        .setTitle("Vast Postal Service Guide")
        .setDescription("There are two different methods: MARKET and NORMAL. When ordering, put MARKET to FALSE if you want NORMAL. NORMAL is where we deliver from point A to B. MARKET is where you order an item, we grab it from our own storages, and deliver. To place an order, do /orderplace. The difference of premium and non-premium is that **we are only accountable for a quarter of the item rounded down if it is lost or destroyed.** Premium means we are accountable for delivering the whole item back, and we use more strict procedures to ensure a good shipping for the package. Here are the costs:")
        .addFields([
            {
                name: "MARKET",
                value: "1 IRON / 1000 blocks + ITEM COST",
                inline: true
            },
            {
                name: "MARKET + PREMIUM",
                value: "2 IRON / 1000 blocks + ITEM COST",
                inline: true
            },
            {
                name: "NORMAL",
                value: "1 IRON / 1000 blocks + 1 IRON",
                inline: true
            },
            {
                name: "NORMAL + PREMIUM",
                value: "3 IRON / 1000 blocks + 1 IRON",
                inline: true
            }
        ])
        .setColor("BLURPLE")

        await interaction.reply({ embeds: [helpEmbed] })

        return
    },
};