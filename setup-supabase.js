const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('\n=== QikTix UK Supabase Setup ===\n');
console.log('This script will help you set up your Supabase database for the QikTix UK project.');
console.log('\nTo properly set up Supabase, please follow these steps:');
console.log('\n1. Log in to your Supabase dashboard at https://app.supabase.io');
console.log(`2. Go to your project: ${supabaseUrl}`);
console.log('3. Navigate to the SQL Editor');
console.log('4. Copy and paste the SQL schema from the file below:');
console.log('   ' + path.join(__dirname, 'supabase', 'schema.sql'));
console.log('5. Run the SQL query to create all the necessary tables and functions');

// Read the schema SQL file
const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

console.log('\n=== SQL Schema Preview ===\n');
console.log(schemaSql.substring(0, 500) + '...\n');

console.log('After running the SQL query in the Supabase dashboard, your database will be set up with:');
console.log('- User profiles table');
console.log('- Events table');
console.log('- Ticket types table');
console.log('- Tickets table');
console.log('- Orders table');
console.log('- Order items table');
console.log('- Ticket transfers table');
console.log('- Waitlist table');
console.log('- Event reviews table');
console.log('- Notifications table');
console.log('- Row-level security policies');
console.log('- Triggers and functions');

console.log('\n=== Next Steps ===\n');
console.log('1. Create a service role API key in your Supabase dashboard');
console.log('2. Update your .env.local file with the service role API key');
console.log('3. Start your Next.js application with: npm run dev');

console.log('\nYour Supabase configuration:');
console.log(`URL: ${supabaseUrl}`);
console.log('Key: ' + (supabaseKey ? supabaseKey.substring(0, 5) + '...' : 'Not set'));

console.log('\nFor more information, visit the Supabase documentation:');
console.log('https://supabase.com/docs');

