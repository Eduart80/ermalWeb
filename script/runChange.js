// generate-config.js (run locally)
const fs = require('fs');
// Get current year and month in YYYY-MM format
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
const currentMonth = `${year}-${month}`;

const config = {
    SERVICE_ID: Buffer.from(`service_4fdhyzk`).toString('base64'),
    TEMPLATE_ID: Buffer.from(`template_z6qj346`).toString('base64'),
    COM_TEMPLATE_ID: Buffer.from(`template_5vn7gdi`).toString('base64'),
    USER_ID: Buffer.from(`SELPS1Q3isb2mYOFb`).toString('base64'),
    COMPANY_EMAIL: Buffer.from('ermalhila@hotmail.com').toString('base64')
    
};

fs.writeFileSync('script/config.js', `
    window.EMAIL_CONFIG = {
        SERVICE_ID: atob('${config.SERVICE_ID}'),
        TEMPLATE_ID: atob('${config.TEMPLATE_ID}'),
        COM_TEMPLATE_ID: atob('${config.COM_TEMPLATE_ID}'),
        USER_ID: atob('${config.USER_ID}'),
        COMPANY_EMAIL: atob('${config.COMPANY_EMAIL}')
    };
`);
console.log('Generated config.js for', currentMonth);