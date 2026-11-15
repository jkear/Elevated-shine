// Public (anon) access to the same Supabase project the previous site used.
// A quote request is one REST insert, so this calls the endpoint directly
// instead of shipping the whole Supabase client to every visitor.
const SUPABASE_URL = 'https://hhdrqgkhpfmbujlnhtlm.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZHJxZ2tocGZtYnVqbG5odGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NjEyOTksImV4cCI6MjA5ODEzNzI5OX0.RwD226ULuyl1pfFxM_xQwSUsWug9SvhnkZiDtLhFotU';

/** Inserts one row into `bookings`. Resolves to an error message, or null on success. */
export async function insertBooking(row: Record<string, unknown>): Promise<string | null> {
  const fallback = 'Something went wrong. Please try again.';
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (res.ok) return null;
    const detail = await res.json().catch(() => null);
    return (detail && typeof detail.message === 'string' && detail.message) || fallback;
  } catch {
    return fallback;
  }
}
