const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
//isPremium, isMarket, toX, toZ, fromX, fromZ, toPlayerName, fromPlayerName
/**
 * .addStringOption(option => option.setName('Name').setDescription('Enter a string'))
        .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        .addNumberOption(option => option.setName('number').setDescription('Select a boolean'))
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('orderplace')
        .setDescription('place an order')
        .addBooleanOption(option => option.setName('ispremium').setDescription('pick whether the order is premium or not').setRequired(true))
        .addBooleanOption(option => option.setName('ismarket').setDescription('pick whether the order is market or not').setRequired(true))
        .addNumberOption(option => option.setName('tox').setDescription('pick the X coordinate to deliver to'))
        .addNumberOption(option => option.setName('toz').setDescription('pick the Z coordinate to deliver to'))
        .addNumberOption(option => option.setName('fromx').setDescription('pick the X coordinate to pickup from'))
        .addNumberOption(option => option.setName('fromz').setDescription('pick the Z coordinate to pickup from'))
        .addStringOption(option => option.setName('toplayername').setDescription('enter the name of the player to deliver to'))
        .addStringOption(option => option.setName('fromplayername').setDescription('enter the name of the player to pickup from'))
        ,
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.
        dat.addOrder(new dat.Order(
            interaction.options.getBoolean('ispremium'), 
            interaction.options.getBoolean('ismarket'), 
            interaction.options.getNumber('tox'), 
            interaction.options.getNumber('toz'), 
            interaction.options.getNumber('fromx'), 
            interaction.options.getNumber('fromz'), 
            interaction.options.getString('toplayername'), 
            interaction.options.getString('fromplayername')
        ))

        await interaction.reply({ embeds: [new MessageEmbed().setDescription("great, set up an order for you!")] })

        return
    },
};