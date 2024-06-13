import telebot
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env')
bot_token = os.getenv('BOT_TOKEN', '')
bot = telebot.TeleBot(bot_token)

# In-memory dictionary to store user session data
user_sessions = {}

def get_token_balances(wallet):
    # Dummy function to fetch token balances
    return '100', '200'

def start_trade(chat_id):
    if 'wallet' in user_sessions[chat_id] and user_sessions[chat_id]['wallet']:
        wallet = user_sessions[chat_id]['wallet']
        tokenA_balance, tokenB_balance = get_token_balances(wallet)
        user_sessions[chat_id]['tokenA_balance'] = tokenA_balance
        user_sessions[chat_id]['tokenB_balance'] = tokenB_balance
        return True, tokenA_balance, tokenB_balance
    return False, None, None

def perform_trade(data):
    response = requests.post('http://localhost:3000/api/trade', json=data)
    return response.status_code == 200

@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    if chat_id not in user_sessions:
        user_sessions[chat_id] = {'wallet': None, 'trading': False}

    if user_sessions[chat_id]['wallet'] is None:
        bot.reply_to(message, 'Please enter your wallet address.')
    else:
        success, tokenA_balance, tokenB_balance = start_trade(chat_id)
        if success:
            bot.reply_to(message, f"Token A Balance: {tokenA_balance}\nToken B Balance: {tokenB_balance}\nPlease enter the amount of Token A to swap:")
            bot.register_next_step_handler(message, get_token_a_amount)
        else:
            bot.reply_to(message, 'Wallet address not found. Please enter your wallet address first.')

def get_token_a_amount(message):
    chat_id = message.chat.id
    user_sessions[chat_id]['amountA'] = message.text
    bot.send_message(chat_id, 'Please enter the amount of Token B to swap:')
    bot.register_next_step_handler(message, get_token_b_amount)

def get_token_b_amount(message):
    chat_id = message.chat.id
    user_sessions[chat_id]['amountB'] = message.text
    wallet = user_sessions[chat_id]['wallet']

    data = {
        'privateKey': os.getenv('PRIVATE_KEY'),
        'tokenA': 'TOKEN_A_ADDRESS',
        'tokenB': 'TOKEN_B_ADDRESS',
        'amountA': user_sessions[chat_id]['amountA'],
        'amountB': user_sessions[chat_id]['amountB']
    }

    if perform_trade(data):
        bot.send_message(chat_id, 'Trade started successfully!')
        user_sessions[chat_id]['trading'] = True
    else:
        bot.send_message(chat_id, 'Failed to start trade.')

@bot.message_handler(commands=['end'])
def end(message):
    chat_id = message.chat.id
    if chat_id in user_sessions and user_sessions[chat_id]['trading']:
        user_sessions[chat_id]['trading'] = False
        bot.send_message(chat_id, 'Trading has been stopped.')
    else:
        bot.send_message(chat_id, 'Trading is not active.')

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id

    if message.text.startswith('/'):
        return

    if chat_id in user_sessions and user_sessions[chat_id]['wallet'] is None:
        user_sessions[chat_id]['wallet'] = message.text
        bot.reply_to(message, 'Wallet address saved. Thank you! You can now start trading using the /start command.')
    else:
        bot.reply_to(message, 'You have already provided your wallet address.')

if __name__ == '__main__':
    bot.remove_webhook()
    bot.polling()
