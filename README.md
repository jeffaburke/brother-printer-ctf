# Brother Printer CTF Portal

A CTF machine that emulates a Brother printer web portal with intentional security vulnerabilities for educational purposes.

## 🎯 CTF Objective

This machine simulates a Brother printer web interface with default credentials and exposed sensitive information. Participants need to:

1. **Login with default credentials** (1234567:1234567)
2. **Access the settings page** to find SMTP credentials
3. **Extract the flag** from the SMTP password field

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

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Access the portal:**
   - Open your browser to `http://localhost:5000`
   - Login with credentials: `1234567` / `1234567`
   - Navigate to Settings to find the flag

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
   - Login and find the flag in Settings

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
- **Login System:** Default credentials authentication
- **Dashboard:** Overview of printer status and quick actions
- **Settings Page:** SMTP credentials display (contains the flag)
- **Admin Panel:** Security warnings and audit logs
- **Session Management:** Proper login/logout functionality

#### 🎭 Non-Functional Features (for realism)
- **Printer Status:** Device information and supply levels
- **Scan Settings:** Document scanning configuration
- **Network Settings:** Network configuration and services
- **Maintenance:** System maintenance and firmware updates

## 🔒 Security Vulnerabilities (Intentional)

This CTF machine includes several intentional security issues:

1. **Default Credentials:** Unchanged default login credentials
2. **Exposed SMTP Credentials:** Plain text storage and display
3. **Security Warnings:** Admin panel shows various security issues
4. **HTTP Only:** No HTTPS encryption (realistic for many printer interfaces)
5. **Verbose Error Messages:** Detailed error information in logs

## 🛠️ Deployment Options

### Option 1: Apache + mod_wsgi (Recommended)
- Uses the provided Ansible playbook
- Production-ready configuration
- Proper process management
- Logging and monitoring

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

### Adding New Vulnerabilities
- Add new routes in `app.py`
- Create corresponding templates
- Implement intentional security flaws

## 🎓 Educational Value

This CTF machine teaches:
- **Web Application Security:** Common vulnerabilities in embedded devices
- **Default Credentials:** Importance of changing default passwords
- **Information Disclosure:** Dangers of exposing sensitive data
- **Network Security:** Risks of unencrypted web interfaces
- **Printer Security:** Specific vulnerabilities in network printers

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
