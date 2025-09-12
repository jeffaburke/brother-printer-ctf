#!/usr/bin/env python3
"""
Brother Printer Web Portal - CTF Machine
Emulates a Brother printer web interface with login functionality
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import os
import hashlib
from functools import wraps

app = Flask(__name__)
app.secret_key = 'brother_printer_secret_key_2024'

# Default credentials
DEFAULT_USERNAME = "1234567"
DEFAULT_PASSWORD = "1234567"

# SMTP credentials (the flag/secret)
SMTP_CREDENTIALS = {
    "username": "scans@chernobyl.local",
    "password": "YouFoundMyPass"
}

# Printer information constants
PRINTER_INFO = {
    "model": "Brother MFC-L2750DW",
    "serial": "U12345G6J123456",
    "firmware": "1.15",
    "status": "Ready",
    "ip_address": "192.168.1.100",
    "mac_address": "00:80:77:12:34:56",
    "hostname": "BROTHER-MFC-L2750DW",
    "uptime": "2 days, 14 hours"
}

# Supply levels
SUPPLY_LEVELS = {
    "black_toner": 85,
    "drum_unit": 92,
    "paper_tray_1": 100,
    "waste_toner": 15
}

# Print statistics
PRINT_STATS = {
    "total_pages": 1247,
    "black_white": 1180,
    "color": 67,
    "this_month": 45,
    "last_month": 78
}

# Network configuration
NETWORK_CONFIG = {
    "connection_type": "Ethernet",
    "ip_config": "Static IP",
    "ip_address": "192.168.1.100",
    "subnet_mask": "255.255.255.0",
    "default_gateway": "192.168.1.1",
    "primary_dns": "8.8.8.8",
    "mac_address": "00:80:77:12:34:56",
    "hostname": "BROTHER-MFC-L2750DW",
    "link_speed": "100 Mbps",
    "signal_strength": "Excellent"
}

# Service status
SERVICE_STATUS = {
    "web_interface": True,
    "https": False,
    "snmp": True,
    "ftp": False,
    "telnet": False,
    "samba": False
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session or session.get('user_type') != 'admin':
            flash('Admin access required', 'error')
            return redirect(url_for('dashboard'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    """Redirect to login page"""
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == DEFAULT_USERNAME and password == DEFAULT_PASSWORD:
            session['logged_in'] = True
            session['username'] = username
            session['user_type'] = 'admin'  # Default user has admin access
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid credentials', 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """Logout and clear session"""
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    """Main dashboard"""
    return render_template('dashboard.html', 
                         username=session.get('username'),
                         printer_info=PRINTER_INFO,
                         supply_levels=SUPPLY_LEVELS,
                         print_stats=PRINT_STATS)

@app.route('/settings')
@login_required
def settings():
    """Settings page with SMTP credentials"""
    return render_template('settings.html', 
                         smtp_creds=SMTP_CREDENTIALS,
                         printer_info=PRINTER_INFO)

@app.route('/admin')
@admin_required
def admin():
    """Admin panel for security controls"""
    return render_template('admin.html')

@app.route('/printer_status')
@login_required
def printer_status():
    """Printer status page (non-functional)"""
    return render_template('printer_status.html',
                         printer_info=PRINTER_INFO,
                         supply_levels=SUPPLY_LEVELS,
                         print_stats=PRINT_STATS)

@app.route('/scan_settings')
@login_required
def scan_settings():
    """Scan settings page (non-functional)"""
    return render_template('scan_settings.html')

@app.route('/network_settings')
@login_required
def network_settings():
    """Network settings page (non-functional)"""
    return render_template('network_settings.html',
                         network_config=NETWORK_CONFIG,
                         service_status=SERVICE_STATUS,
                         printer_info=PRINTER_INFO)

@app.route('/maintenance')
@login_required
def maintenance():
    """Maintenance page (non-functional)"""
    return render_template('maintenance.html',
                         printer_info=PRINTER_INFO,
                         print_stats=PRINT_STATS)

@app.route('/api/printer_info')
@login_required
def printer_info():
    """API endpoint for printer information"""
    return jsonify(PRINTER_INFO)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
