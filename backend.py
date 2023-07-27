import sys

import eel
from typing import List, Dict
from selenium.webdriver.remote.webdriver import WebDriver
from helper import starteel, cookies, scraper, gpt
import os

# Use latest version of Eel from parent directory
sys.path.insert(1, '../../')


@eel.expose  # Expose function to JavaScript
def say_hello_py(x):
    """Print message from JavaScript on app initialization, then call a JS function."""
    print('Hello from %s' % x)  # noqa T001

@eel.expose
def check_key() -> bool:
    if not os.path.exists("apikey.config"):
        return False
    with open("apikey.config", 'r') as f:
        return gpt.submit_api_key(f.read())
        
@eel.expose
def submit_api_key(key: str) -> bool:
    if gpt.submit_api_key(key):
        with open("apikey.config", 'w') as f:
            f.write(key)
        return True
    return False

@eel.expose
def save_descriptions(descs: List[str]):
    with open('descriptions.config', 'w') as f:
        for desc in descs:
            f.write(desc+'\n')
    gpt.replace_prompt()

@eel.expose
def get_descriptions() -> List[str]:
    if not os.path.exists('descriptions.config'):
        return []
    with open('descriptions.config', 'r') as f:
        descs = []
        for line in f:
            descs.append(line.strip())
        return descs

@eel.expose
def start():
    eel.spawn(scraper.start)

@eel.expose
def stop():
    scraper.stop()
@eel.expose
def get_unanswered():
    if not os.path.exists('unanswered.config'):
        return []
    result = []
    with open('unanswered.config', 'r') as f:
        count = 0
        entry = {'sender': '', 'message': ''}
        for line in f:
            line = line.strip()
            if (count == 0):
                entry = {'sender': '', 'message': ''}
                entry['sender'] = line
                count += 1
            elif count > 0 and line != '------':
                entry['message'] += line
            if line == '------':
                count = 0
                result.append(entry)
    return result
@eel.expose
def save_unanswered(newList: List[Dict[str, str]]):
    with open('unanswered.config', 'w') as f:
        for entry in newList:
            f.write(entry['sender']+'\n')
            f.write(entry['message']+'\n')
            f.write('------')

@eel.expose
def clear_cookies():
    cookies.clear_cookies()
    
if __name__ == '__main__':
    import sys

    # Pass any second argument to enable debugging
    starteel.start_eel(develop=len(sys.argv) == 2)
    #eel.show_log('hey from python')()

