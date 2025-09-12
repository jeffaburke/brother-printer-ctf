#!/usr/bin/python3
"""
WSGI Entry Point for Brother Printer CTF Portal
This file should be placed in the application directory and referenced by Apache
"""

import sys
import os

# Add the application directory to Python path
app_dir = '/var/www/brother-printer-ctf'
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

# Change to application directory
os.chdir(app_dir)

# Import the Flask application
from app import app as application

if __name__ == "__main__":
    # This should not be reached when running under Apache/mod_wsgi
    application.run(host='0.0.0.0', port=5000, debug=False)
