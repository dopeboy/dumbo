#!/usr/bin/env python

import os
import argparse
import sys
import subprocess

# python2/3 compat
try:
    input = raw_input
except NameError:
    pass

BUCKET = "s3://dumbo-assets"

def binary_exists(cmd):
    print("Checking if '%s' exists." % cmd)
    return subprocess.check_call(["which", cmd]) == 0

def prompt(message, validate=lambda x: x):
    while True:
        resp = input(message + " ").strip()
        try:
            x = validate(resp)
            return x
        except Exception as e:
            print("Invalid response: %s" % str(e))


def take_screenshot(path, name):
    fname = os.path.join(path, "%s.png" % name)
    ret = subprocess.check_call(["scrot", "-s", fname])
    assert ret == 0, "Failed to take screenshot '%s'." % fname

def run_screenshot(options):
    dest = os.path.abspath(options.destination_dir)
    assert os.path.exists(dest), "%s does not exist." % dest
    if os.listdir(dest):
        print("Warning: %s is not empty, files may be overwritten." % dest)
    assert binary_exists("scrot"), "'scrot' must be installed to use this."

    i = 1
    print("\nUse Ctrl-C to exit.\n")
    try:
        questions = prompt("How many questions are there in this section?", int)
        answers = prompt("How many questions have answers in this section?", int)

        for i in range(1, questions + 1):
            print("Capture screenshot for question %d. " % i)
            take_screenshot(dest, "q%d" % i)

            if i <= answers:
                print("Capture screenshot for answer %d." % i)
                take_screenshot(dest, "q%danswer" % i)
            elif i == answers + 1:
                print("Skipping answers for remaining questions.")
    except KeyboardInterrupt:
        print("Exiting.")

def run_upload(options):
    src = os.path.abspath(options.source_dir)
    assert os.path.exists(src), "%s does not exist." % fname
    assert binary_exists("s3cmd"), "'s3cmd' must be installed to use this."
    import pdb; pdb.set_trace()
    ret = subprocess.check_call(["s3cmd", "put", os.path.join(src, "*.png"), os.path.join(BUCKET, options.s3_path, ""), "--disable-multipart"])
    assert ret == 0, "Failed to upload directory."

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers()

    screenshot_parser = subparsers.add_parser("screenshot", help="Interactively screenshot a test.")
    screenshot_parser.add_argument("destination_dir", help="The directory to place screenshots.")
    screenshot_parser.set_defaults(func=run_screenshot)

    upload_parser = subparsers.add_parser("upload", help="Upload screenshots to s3.")
    upload_parser.add_argument("source_dir", help="The directory with screenshots.")
    upload_parser.add_argument("s3_path", help="The S3 path in s3://dumbo-assets where the screenshots will be placed.")
    upload_parser.set_defaults(func=run_upload)

    options = parser.parse_args()
    options.func(options)
