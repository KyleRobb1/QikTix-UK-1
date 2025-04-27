# QikTix UK – The Smarter Way to Ticket

QikTix UK is a modern, full-stack event ticketing platform built with Next.js, React, Framer Motion, and Supabase. This platform provides a comprehensive solution for event organizers and attendees, with features like secure ticket purchasing, mobile e-tickets with QR codes, and real-time event management.

## Features

- **User Authentication**: Email/password and social login via Supabase Auth
- **Event Management**: Create, edit, and publish events with customizable details
- **Advanced Ticketing**: Multiple ticket types with dynamic pricing and availability
- **Interactive Seat Maps**: Assigned seating using SVG or Canvas
- **Secure Payments**: Integrated with PayPal for secure transactions
- **Mobile E-Tickets**: QR code-based digital tickets for easy event entry
- **Ticket Transfers**: Transfer tickets between users seamlessly
- **Real-time Notifications**: Updates for event changes or ticket transfers
- **Event Discovery**: Search events by date, location, category, and more
- **Analytics Dashboard**: Track ticket sales and revenue for organizers
- **GDPR Compliance**: Secure and privacy-focused design

## Tech Stack

- **Frontend**: React.js with Next.js and Framer Motion for animations
- **Backend**: Supabase (PostgreSQL database + authentication)
- **Styling**: Tailwind CSS for responsive design
- **Payments**: PayPal integration
- **Deployment**: Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
