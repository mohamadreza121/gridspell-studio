import { Resend } from "resend";

const required = (value, name) => {
  if (!value) throw new Error(`Missing ${name} in .env.local`);
  return value;
};

const resend = new Resend(required(process.env.RESEND_API_KEY, "RESEND_API_KEY"));
const to = required(
  process.env.EMAIL_TEST_TO || process.env.ADMIN_NOTIFICATION_EMAIL,
  "EMAIL_TEST_TO or ADMIN_NOTIFICATION_EMAIL"
);
const from = required(process.env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL");

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "GridSpell email setup test",
  html: `
    <div style="background:#07080c;color:#fff;padding:32px;font-family:Arial,sans-serif">
      <h1 style="margin:0 0 16px">GridSpell email is connected.</h1>
      <p style="color:#b8bdca">Resend accepted this transactional test message.</p>
    </div>
  `,
  text: "GridSpell email is connected. Resend accepted this transactional test message."
});

if (error) throw new Error(error.message);
console.log(`Test email sent to ${to}. Resend message ID: ${data?.id}`);
