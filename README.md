# Brother Printer CTF Portal

A CTF machine that emulates a Brother printer web portal with intentional security vulnerabilities for educational purposes.

## 🎯 CTF Objective

This machine simulates a Brother printer web interface with default credentials and exposed sensitive information. Participants need to:

1. **Access the settings page** (anonymous access enabled by default)
2. **Find SMTP credentials** displayed on the settings page
3. **Extract the flag** from the SMTP password field
4. **Optional:** Login with default credentials (1234567:1234567) to access admin functions

## 🔑 Default Credentials

- **Username:** `1234567`
- **Password:** `1234567`

## 🏴 Flag Information

The flag is hidden in the SMTP credentials:
- **SMTP Username:** `scans@chernobyl.local`
- **SMTP Password:** `YouFoundMyPass` ← **This is the flag!**

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jeffaburke/brother-printer-ctf.git
   cd brother-printer-ctf
   ```

2. **Start the venv:**
   ```bash
   python -m venv venv
   source ./venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Access the portal:**
   - Open your browser to `http://localhost:5000`
   - Navigate to Settings to find the flag (no login required by default)
   - Optional: Login with credentials: `1234567` / `1234567` for admin access

### Production Deployment with Ansible

1. **Prepare your inventory.ini file:**
   ```ini
   [all]
   
   <ctf-box-ip>
   ```

2. **Run the Ansible playbook:**
   ```bash
   ansible-playbook -i inventory.ini ansible-playbook.yml
   ```

4. **Access the deployed portal:**
   - Navigate to `http://<ctf-box-ip>`
   - Find the flag in Settings (no login required by default)
   - Optional: Login for admin access to change settings

## 🏗️ Architecture

### Application Structure
```
brother-printer-ctf/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/            # HTML templates
│   ├── base.html
│   ├── login.html
│   ├── dashboard.html
│   ├── settings.html
│   ├── admin.html
│   ├── printer_status.html
│   ├── scan_settings.html
│   ├── network_settings.html
│   └── maintenance.html
├── static/               # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── ansible-playbook.yml  # Deployment automation
├── apache-config.conf    # Apache configuration
├── wsgi-entry.py        # WSGI entry point
└── README.md            # This file
```

### Features

#### ✅ Functional Features
- **Anonymous Access:** View settings without login (configurable)
- **Login System:** Default credentials authentication with password change capability
- **Dashboard:** Overview of printer status and quick actions
- **Settings Page:** SMTP credentials display (contains the flag)
- **Admin Panel:** Security warnings and audit logs
- **Access Control:** Admin can enable/disable anonymous access
- **Password Management:** Change admin password functionality
- **Session Management:** Proper login/logout functionality
- **CUPS Integration:** Full CUPS 2.4.2 installation with cups-pdf support

#### 🎭 Non-Functional Features (for realism)
- **Printer Status:** Device information and supply levels
- **Scan Settings:** Document scanning configuration
- **Network Settings:** Network configuration and services
- **Maintenance:** System maintenance and firmware updates

## 🔒 Security Vulnerabilities (Intentional)

This CTF machine includes several intentional security issues:

1. **Anonymous Access:** Settings accessible without authentication by default
2. **Default Credentials:** Unchanged default login credentials
3. **Exposed SMTP Credentials:** Plain text storage and display
4. **Security Warnings:** Admin panel shows various security issues
5. **HTTP Only:** No HTTPS encryption (realistic for many printer interfaces)
6. **Verbose Error Messages:** Detailed error information in logs
7. **Privilege Escalation:** Admin functions accessible with default credentials

## 🛠️ Deployment Options

### Option 1: Apache + mod_wsgi (Recommended)
- Uses the provided Ansible playbook
- Production-ready configuration
- Proper process management
- Logging and monitoring
- **CUPS 2.4.2 Installation:** Full printing system with cups-pdf support
- **Complete Dependencies:** All required packages and libraries

### Option 2: Standalone Flask
- Good for development and testing
- Simple setup with `python app.py`
- Not recommended for production

### Option 3: Docker (Future Enhancement)
- Containerized deployment
- Easy scaling and management
- Consistent environment

## 📝 Customization

### Changing the Flag
Edit the `SMTP_CREDENTIALS` in `app.py`:
```python
SMTP_CREDENTIALS = {
    "username": "scans@chernobyl.local",
    "password": "YourNewFlagHere"
}
```

### Modifying Default Credentials
Update the constants in `app.py`:
```python
DEFAULT_USERNAME = "your_username"
DEFAULT_PASSWORD = "your_password"
```

### Configuring Anonymous Access
Control anonymous access in `app.py`:
```python
# Set to False to require login for all pages
ANONYMOUS_ACCESS_ENABLED = True
```

### CUPS Configuration
The Ansible playbook automatically installs:
- **CUPS 2.4.2** from source with full features
- **cups-pdf** for virtual PDF printing
- **All printer drivers** and dependencies
- **Systemd integration** for service management

### Adding New Vulnerabilities
- Add new routes in `app.py`
- Create corresponding templates
- Implement intentional security flaws

## 🎓 Educational Value

This CTF machine teaches:
- **Web Application Security:** Common vulnerabilities in embedded devices
- **Anonymous Access Risks:** Dangers of allowing unauthenticated access
- **Default Credentials:** Importance of changing default passwords
- **Information Disclosure:** Dangers of exposing sensitive data
- **Access Control:** Proper authentication and authorization mechanisms
- **Network Security:** Risks of unencrypted web interfaces
- **Printer Security:** Specific vulnerabilities in network printers
- **Privilege Escalation:** How default credentials can lead to admin access

## 🆕 Recent Updates

### Version 2.0 Features
- **Anonymous Access System:** Users can view settings without login by default
- **Admin Access Control:** Logged-in admins can enable/disable anonymous access
- **Password Management:** Change admin password functionality with validation
- **CUPS Integration:** Full CUPS 2.4.2 installation with cups-pdf support
- **Enhanced Security:** More realistic printer interface with proper access controls
- **Improved UI:** Better user experience with conditional content display

### Migration Notes
- **Default Behavior:** Anonymous access is now enabled by default
- **CTF Impact:** Flag is now accessible without login (more realistic vulnerability)
- **Admin Functions:** Password changes and access control require authentication
- **CUPS Support:** Full printing system available after deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes only. Use responsibly and only in authorized environments.

---

**Happy Hacking! 🎯**
