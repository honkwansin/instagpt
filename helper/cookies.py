from selenium.webdriver.remote.webdriver import WebDriver
import pickle
import os

def set_cookies(driver: WebDriver):
    with open('cookies.pkl', 'rb') as file:
        cookies = pickle.load(file)
        for cookie in cookies:
            driver.add_cookie(cookie)

def save_cookies(driver: WebDriver):
    cookies = driver.get_cookies()
    with open('cookies.pkl', 'wb') as file:
        pickle.dump(cookies, file)

def clear_cookies():
    if check_cookies():
        os.remove('cookies.pkl')

def check_cookies():
    return os.path.exists('cookies.pkl')