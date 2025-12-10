# Database Migrations

## Adding payment_intent_id field

### Option 1: Run SQL directly in pgAdmin

Copy and paste this SQL command into pgAdmin's Query Tool:

```sql
ALTER TABLE alpine_bookings 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;

COMMENT ON COLUMN alpine_bookings.payment_intent_id IS 'Stripe PaymentIntent ID for tracking payments and enabling refunds';
```

### Option 2: Run the migration file

Execute the SQL file `add_payment_intent_id.sql` in pgAdmin or your database client.

### Option 3: Using psql command line

```bash
psql -d your_database_name -f migrations/add_payment_intent_id.sql
```

## Verification

After running the migration, verify the column was added:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'alpine_bookings' 
AND column_name = 'payment_intent_id';
```

