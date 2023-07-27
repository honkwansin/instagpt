from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementNotVisibleException, TimeoutException, NoSuchWindowException, WebDriverException
from typing import List, Dict, Union
import eel
import asyncio
import json

from helper import cookies, gpt

global states
states: Dict[str, Union[WebDriver, bool]] = {
    'driver': None,
    'run': False,
}
def find(by: By, value, driver: WebDriver, timeout=5) -> WebElement:
    return WebDriverWait(driver, timeout, poll_frequency=1, ignored_exceptions=[NoSuchElementException, ElementNotVisibleException])\
            .until(EC.presence_of_element_located((by, value)))

def find_all(by: By, value, driver: WebDriver, timeout=5) -> List[WebElement]:
    return WebDriverWait(driver, timeout, poll_frequency=1, ignored_exceptions=[NoSuchElementException, ElementNotVisibleException])\
        .until(EC.presence_of_all_elements_located((by, value)))

import time
def await_login(driver: WebDriver):
    global states
    start_time = time.time()
    driver.get("https://www.instagram.com/")
    if (cookies.check_cookies()):
        cookies.set_cookies(driver)
        eel.change_status('Logging in using cookies...')
    else:
        eel.change_status('Please log in your Instagram account')
        while states['run']:
            eel.sleep(0.1) # essential for thread to open up for states
            try:
                if len(find_all(By.CSS_SELECTOR, '[aria-label="Messenger"]', driver)) > 0\
                or len(find_all(By.CSS_SELECTOR, '[aria-label="Direct"]', driver)) > 0:
                    eel.sleep(3)
                    cookies.save_cookies(driver)
                    return
            except TimeoutException:
                print(f'Awaited login for {int(time.time() - start_time)} seconds')

def clear_modal(driver: WebDriver):
    try:
        not_now_button = find(By.XPATH, '//button[text()="Not Now"]', driver)
        not_now_button.click()

    except TimeoutException as e:
        print('Modal not found. Continuing.')
def click_regardless(element: WebElement, driver: WebDriver):
    actions = ActionChains(driver)
    actions.move_to_element(element).click(element).perform()
def click_unread(driver: WebDriver):
    unread = find(By.CSS_SELECTOR, "[aria-label='Unread']", driver)
    click_regardless(unread, driver)
async def check_dm(driver: WebDriver):
    try:
        driver.get("https://www.instagram.com/direct/inbox/")
        clear_modal(driver)
        eel.change_status('Searching for unread messages...')
        click_unread(driver)
        await reply_message(driver)
    except TimeoutException as e:
        eel.change_status('No unread messages')
        print('No unread messages.')
def get_sender_id(text_element: WebElement):
    parent = text_element
    id = None
    while parent is not None:
        siblings = parent.find_elements(
            By.XPATH, 'preceding-sibling::* | following-sibling::*')
        if len(siblings) > 0:
            id = find(By.XPATH, './/*[@href][1]',
                     siblings[0]).get_attribute('href')
            break
        parent = parent.find_element(By.XPATH, '..')

    # Check if we found a parent with a sibling element
    # if parent_with_sibling is not None:
    if id is not None:
        # Do something with the parent element
        print(f'Message sender is: {id}')
        return id
    else:
        raise Exception(
            "No parent with a sibling element found when looking for sender id.")
async def check_requests(driver: WebDriver):
    try:
        eel.change_status('Searching for new requests...')
        driver.get("https://www.instagram.com/direct/requests/")
        element = find(By.CSS_SELECTOR, '[style*="display: flex"]', driver)
        eq = find_all(By.XPATH, '*', element)
        if (len(eq) > 0):
            eq[0].click()
            chat = find(By.XPATH, ".//div[contains(text(),'Accept')]", driver)
            click_regardless(chat, driver)
            print('New chat accepted')
            eel.sleep(3)
            await reply_message(driver)
    except TimeoutException as e:
        eel.change_status('No new requests')
        print('No new requests.')

def save_unanswered(senderURL, message):
    with open('unanswered.config', 'a') as f:
        f.write(senderURL+'\n')
        f.write(message+'\n')
        f.write('------'+'\n') # separator
    

async def reply_message(driver: WebDriver):
    boxes = find_all(By.XPATH, '// *[contains(@style, "min-height: 44px;")]', driver)

    if len(boxes) > 0:
        # get the last message
        box = boxes[-1]
        text = find(By.XPATH, ".//*[not(child::*)]", box)
        print(text.get_attribute("innerHTML"))
        message = text.get_attribute("innerHTML")
        eel.change_status('Answering question...')
        sender = get_sender_id(text)
        full_answer = await gpt.ask(sender, message)
        answers = full_answer.split('---COMMANDS---')

        should_send_answer = True
        if (len(answers) > 1):
            commands = answers[1].split('!')
            for command in commands:
                if (command == "UNANSWERED"):
                    print(f"GPT has trouble answering question: {message}")
                    should_send_answer = False
                    save_unanswered(sender, message)
                    eel.add_unanswered(json.dumps({'sender': sender, 'message': message}))

        if (should_send_answer):
            text_area: WebElement = find(
                By.CSS_SELECTOR, "textarea[placeholder='Message...']", driver)
            text_area.send_keys(answers[0])
            text_area.send_keys(Keys.ENTER)
            eel.change_status('Question answered')


async def main_loop(driver: WebDriver):
    while states['run']:
        await check_dm(driver)
        eel.sleep(3)
        if (not states['run']):
            break
        await check_requests(driver)
        eel.sleep(3)

def run_main_loop(driver):
    asyncio.run(main_loop(driver))
import gevent
def start():
    global states
    states['run'] = True
    if (states['driver'] == None):
        states['driver'] = webdriver.Chrome()
    eel.set_is_running(True)

    try:
        g = gevent.spawn(await_login, states['driver'])
        g.get()
        g = gevent.spawn(run_main_loop, states['driver'])
        g.get()
    except:
        if g.exception and (isinstance(g.exception, NoSuchWindowException)):
            eel.change_status('Browser closed prematurely, please run again')
            states['run'] = False
            states['driver'] = None
            eel.set_is_running(False)
        else:
            raise
    
    # await_login(states['driver'])
    # asyncio.run(main_loop(states['driver']))

def stop():
    global states
    states['run'] = False
    if (states['driver'] != None):
        states['driver'].close()
        states['driver'] = None
    eel.set_is_running(False)