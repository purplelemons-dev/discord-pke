
import discord.bot
import dotenv
import os

dotenv.load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

bot = discord.bot.Bot()

bot.run(TOKEN, bot=False)
