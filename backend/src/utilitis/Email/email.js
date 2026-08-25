import config from "../../config.js";
// SMTP (port 587/465) Render free tier e block/timeout hote pare,
// tai Brevo er HTTP API (port 443) diye email pathano hocche - eta beshi reliable.
export const sendEmail = async (email, subject, text) => {
 const response = await fetch("https://api.brevo.com/v3/smtp/email", {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 Accept: "application/json",
 "api-key": config.BREVO_API_KEY,
 },
 body: JSON.stringify({
 sender: { email: config.EMAIL_FROM },
 to: [{ email }],
 subject: subject,
 textContent: text,
 }),
 });
 if (!response.ok) {
 const errorData = await response.json().catch(() => ({}));
 throw new Error(errorData.message || "Failed to send email via Brevo API");
 }
 return response.json();
};
