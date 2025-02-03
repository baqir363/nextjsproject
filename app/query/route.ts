import { NextResponse } from 'next/server';
import postgres from 'postgres';

// Initialize the database connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Function to fetch invoices
async function listInvoices() {
  return await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
}

// Define the GET request handler
export async function GET() {
  try {
    const data = await listInvoices();
    return NextResponse.json({ data });
  } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
