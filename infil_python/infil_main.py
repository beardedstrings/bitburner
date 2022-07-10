# Bitburner infiltration Solver Script
# Author: BeardedStrings
# Date: 07/09/2022
#
# This script is designed to solve the Bitburner infiltration mini-games.
# It will identify the mini-game and solve it automatically.
# Press the hotkey when infiltration is started.

# This script is in progress.

import os
import pydirectinput
import time
import pyautogui
from pynput import keyboard
from PIL import Image
import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def on_press(key):
    if key == keyboard.Key.f1:
        print("F1: Infiltrating")
        start_inflitration()
    elif key == keyboard.Key.f4:
        print("F4 pressed")
        mouse_loc()
        return
    elif key == keyboard.Key.f2:
        print("F2 - Screenshot")
        take_Screenshot()
    elif key == keyboard.Key.f3:
        print("F3 - Quit")
        quit()


def start_inflitration():
    identify_mini_game()
    print("Starting infiltration")
    # identify the mini game

def identify_mini_game():
    print("Identifying mini game")
    checkLocationsForGame = pyautogui.screenshot(
        'T:\\CodingProgrammingScripts\\Bitburner_Scripts\\bitburner\\infil_python\\infil_screens\\matchGame.png', region=(1486, 920, 800, 700))
    img = cv2.imread(
        'T:\\CodingProgrammingScripts\\Bitburner_Scripts\\bitburner\\infil_python\\infil_screens\\matchGame.png')
    tesText = (pytesseract.image_to_string(img))
    # print(tesText)
    if("match" in (tesText).lower()):
        print("Match Game found")
        return True
    elif ("code" in (tesText).lower()):
        print("Code found")
        return True
    elif ("remember" in (tesText).lower()):
        print("Remember the mines found")
        return True
    elif ("wires" in (tesText).lower()):
        print("Cut The Wires found")
        return True
    elif ("guard" in (tesText).lower()):
        print("Guard found")
        return True
    elif ("backwards" in (tesText).lower()):
        print("backwards")
        return True
    elif ("brackets" in (tesText).lower()):
        print("Brakets found")
        return True

    # cv2.imshow('Result',img)
    # cv2.waitKey(0)

    return

def solve_enterTheCode():
    # take screenshot, figure out key, press key, screen again until no arrow appears
    arrowToPress = pyautogui.screenshot(
        'T:\\CodingProgrammingScripts\\Bitburner_Scripts\\bitburner\\infil_python\\infil_screens\\arrowShot.png', region=(1486, 920, 800, 700)) # get the correct region
    
    # if statements to determine the area
    # fix direction so it compares
    # loop here until no arrow is detected
    if("left" in (arrowToPress)):
        print("Left arrow")
        pyautogui.press("left")
    elif("right" in (arrowToPress)):
        print("Right arrow")
        pyautogui.press("right")
    elif("up" in (arrowToPress)):
        print("Up arrow")
        pyautogui.press("up")
    elif("down" in (arrowToPress)):
        print("Down arrow")
        pyautogui.press("down")
    
    
    # SCREENSHOT region
    
    return

def press_key(key):
    with keyboard.GlobalHotKeys({key: on_press}) as h:
        h.join()

def take_Screenshot():
    print("Taking screenshot")
    pyautogui.screenshot(
        'T:\\CodingProgrammingScripts\\Bitburner_Scripts\\bitburner\\infil_python\\infil_screens\\pic.png')
    print("Screen taken")
    return


def mouse_loc():
    print('Press Ctrl-C to quit.')
    try:
        while True:
            x, y = pyautogui.position()
            positionStr = 'X: ' + str(x).rjust(4) + ' Y: ' + str(y).rjust(4)
            print(positionStr, end='')
            print('\b' * len(positionStr), end='', flush=True)
    except KeyboardInterrupt:
        print('\n')
    return


### MAIN FUNCTION ###
def main():
    pyautogui.FAILSAFE = True

    print("Starting on 3...")


for i in range(1, 4, 1):
    time.sleep(1)
    print("and...", i)

# Screenshot

shot = pyautogui.screenshot(
    'T:\\CodingProgrammingScripts\\Bitburner_Scripts\\bitburner\\infil_python\\infil_screens\\shottest.png')

with keyboard.Listener(on_press=on_press) as listener:
    listener.join()

if __name__ == "__main__":
    main()
