// Brother Printer Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-hide alerts after 5 seconds
    setTimeout(function() {
        var alerts = document.querySelectorAll('.alert');
        alerts.forEach(function(alert) {
            if (alert.classList.contains('alert-success') || alert.classList.contains('alert-info')) {
                var bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        });
    }, 5000);

    // Add loading states to forms on submit
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && !submitButton.disabled) {
                var originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitButton.disabled = true;
                
                // Re-enable after 5 seconds (in case of errors)
                setTimeout(function() {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 5000);
            }
        });
    });

    // Copy to clipboard functionality
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('Copied to clipboard!', 'success');
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                showToast('Failed to copy to clipboard', 'error');
            });
        } else {
            // Fallback for older browsers
            var textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast('Copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy: ', err);
                showToast('Failed to copy to clipboard', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    };

    // Toggle password visibility
    window.togglePassword = function() {
        var passwordField = document.getElementById('smtpPassword');
        var toggleIcon = document.getElementById('toggleIcon');
        
        if (passwordField && toggleIcon) {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.className = 'fas fa-eye-slash';
            } else {
                passwordField.type = 'password';
                toggleIcon.className = 'fas fa-eye';
            }
        }
    };

    // Show toast notifications
    function showToast(message, type) {
        var toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '9999';
            document.body.appendChild(toastContainer);
        }

        var toastId = 'toast-' + Date.now();
        var toastHtml = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-${type === 'success' ? 'success' : 'danger'} text-white">
                    <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'} me-2"></i>
                    <strong class="me-auto">${type === 'success' ? 'Success' : 'Error'}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        
        var toastElement = document.getElementById(toastId);
        var toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }

    // Simulate real-time updates for dashboard
    if (document.querySelector('.dashboard-stats')) {
        setInterval(function() {
            // Update random stats (for demo purposes)
            var stats = document.querySelectorAll('.stat-value');
            stats.forEach(function(stat) {
                if (stat.dataset.animate) {
                    var currentValue = parseInt(stat.textContent);
                    var change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    var newValue = Math.max(0, currentValue + change);
                    stat.textContent = newValue;
                }
            });
        }, 10000); // Update every 10 seconds
    }

    // Add click handlers for disabled buttons to show "feature not implemented" messages
    var disabledButtons = document.querySelectorAll('button:disabled, .btn:disabled');
    disabledButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('This feature is not implemented in the demo', 'info');
        });
    });

    // Form validation
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Auto-refresh printer status every 30 seconds
    if (window.location.pathname.includes('printer_status')) {
        setInterval(function() {
            // Simulate status update
            var statusBadges = document.querySelectorAll('.badge');
            statusBadges.forEach(function(badge) {
                if (badge.textContent === 'Ready') {
                    // Occasionally change status for demo
                    if (Math.random() < 0.1) { // 10% chance
                        badge.textContent = 'Busy';
                        badge.className = 'badge bg-warning';
                        setTimeout(function() {
                            badge.textContent = 'Ready';
                            badge.className = 'badge bg-success';
                        }, 3000);
                    }
                }
            });
        }, 30000);
    }
});

// Global utility functions
window.utils = {
    formatBytes: function(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    
    formatDate: function(date) {
        return new Date(date).toLocaleString();
    },
    
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};
