#!/usr/bin/env node
/**
 * First Choice Cyber — PayPal Setup Script
 *
 * Creates PayPal products and subscription plans for the Membership page.
 * Run once per environment (sandbox / live) to generate the plan IDs.
 *
 * Usage:
 *   node --env-file=.env.local scripts/setup-paypal.mjs
 *   pnpm run setup:paypal
 */

import crypto from 'node:crypto';

// ─── Config ──────────────────────────────────────────────────────────────────

const MODE          = process.env.PAYPAL_MODE ?? 'sandbox';
const CLIENT_ID     = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firstchoicecyber.com';

const BASE_URL = MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌  Missing credentials. Ensure PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET are in .env.local\n');
  process.exit(1);
}

// ─── PayPal API helpers ───────────────────────────────────────────────────────

async function getAccessToken() {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function createProduct(token, { name, description }) {
  const isRealDomain = SITE_URL && !SITE_URL.includes('localhost') && !SITE_URL.includes('127.0.0.1');

  const body = {
    name,
    description,
    type: 'SERVICE',
    category: 'SOFTWARE',
    ...(isRealDomain && { home_url: `${SITE_URL}/membership` }),
  };

  const res = await fetch(`${BASE_URL}/v1/catalogs/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'PayPal-Request-Id': crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Create product failed: ${JSON.stringify(data)}`);
  console.log(`  ✓ Product created: "${name}"  →  ${data.id}`);
  return data.id;
}

async function createPlan(token, { productId, name, description, amount, intervalUnit }) {
  const res = await fetch(`${BASE_URL}/v1/billing/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'PayPal-Request-Id': crypto.randomUUID(),
    },
    body: JSON.stringify({
      product_id: productId,
      name,
      description,
      status: 'ACTIVE',
      billing_cycles: [
        {
          frequency: {
            interval_unit: intervalUnit, // 'MONTH' or 'YEAR'
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // 0 = indefinite / until cancelled
          pricing_scheme: {
            fixed_price: {
              value: amount,
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Create plan failed: ${JSON.stringify(data)}`);
  console.log(`  ✓ Plan created:    "${name}"  →  ${data.id}`);
  return data.id;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(` First Choice Cyber — PayPal Setup (${MODE.toUpperCase()})`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  console.log('🔑  Getting access token...');
  const token = await getAccessToken();
  console.log('  ✓ Authenticated\n');

  // ── Products ──────────────────────────────────────────────────────────────
  console.log('📦  Creating products...');

  const homeProductId = await createProduct(token, {
    name: 'Home AI Concierge Membership',
    description: 'Ongoing AI support, priority access, and monthly check-ins for your home.',
  });

  const bizProductId = await createProduct(token, {
    name: 'Business AI Concierge Membership',
    description: 'Dedicated AI support, monthly strategy calls, and team training for your business.',
  });

  // ── Plans ─────────────────────────────────────────────────────────────────
  console.log('\n📋  Creating subscription plans...');

  const homeMonthlyId = await createPlan(token, {
    productId: homeProductId,
    name: 'Home AI Concierge — Monthly',
    description: '$99/month. Priority support, monthly AI tips, annual in-home checkup. Cancel anytime.',
    amount: '99.00',
    intervalUnit: 'MONTH',
  });

  const homeAnnualId = await createPlan(token, {
    productId: homeProductId,
    name: 'Home AI Concierge — Annual',
    description: '$999/year. Same benefits as monthly, billed annually. Save ~16%.',
    amount: '999.00',
    intervalUnit: 'YEAR',
  });

  const bizMonthlyId = await createPlan(token, {
    productId: bizProductId,
    name: 'Business AI Concierge — Monthly',
    description: '$499/month. Dedicated contact, monthly video check-in, annual on-site visit. Cancel anytime.',
    amount: '499.00',
    intervalUnit: 'MONTH',
  });

  const bizAnnualId = await createPlan(token, {
    productId: bizProductId,
    name: 'Business AI Concierge — Annual',
    description: '$3,999/year. Same benefits as monthly, billed annually. Save ~33%.',
    amount: '3999.00',
    intervalUnit: 'YEAR',
  });

  // ── Output ────────────────────────────────────────────────────────────────
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(' ✅  All done! Copy these into your .env.local:');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`NEXT_PUBLIC_PAYPAL_PLAN_HOME_MONTHLY=${homeMonthlyId}`);
  console.log(`NEXT_PUBLIC_PAYPAL_PLAN_HOME_ANNUAL=${homeAnnualId}`);
  console.log(`NEXT_PUBLIC_PAYPAL_PLAN_BUSINESS_MONTHLY=${bizMonthlyId}`);
  console.log(`NEXT_PUBLIC_PAYPAL_PLAN_BUSINESS_ANNUAL=${bizAnnualId}`);
  console.log(`\nThen restart your dev server to pick up the new plan IDs.\n`);
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
