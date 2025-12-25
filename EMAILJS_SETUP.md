# EmailJS Setup Instructions

To enable real email sending from your contact form, follow these steps:

## 1. Create a Free EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account (supports 200 emails/month)

## 2. Add Email Service
1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account: `ishimwehonore450@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with these variables:
   ```
   Subject: New Contact Form Message from {{from_name}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```
4. Copy the **Template ID** (e.g., `template_xyz456`)

## 4. Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefgh123456`)

## 5. Update Your Code
Open `src/components/ContactSection.jsx` and replace the placeholder values at the top:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';     // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';     // Replace with your Public Key
```

## 6. Test It!
1. Run `npm run dev`
2. Fill out the contact form and submit
3. Check `ishimwehonore450@gmail.com` for the email!

## Troubleshooting
- If emails aren't sending, check the browser console for errors
- Make sure your Gmail account is properly connected in EmailJS
- Verify all three IDs are correct (no typos)
- Check your EmailJS dashboard for email quota limits

---

**Note**: The library `@emailjs/browser` has already been installed via `npm install @emailjs/browser`
