    import { createClient } from '@supabase/supabase-js'

    const SUPABASE_URL='https://vsjspsvufqzyyqapshdd.supabase.co'
    const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzanNwc3Z1ZnF6eXlxYXBzaGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTc4MTUsImV4cCI6MjA2NTg3MzgxNX0.ezKftdsvvFlSovksbBDlga7QBZhgSC0JvPJhODziKPs'

    export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
