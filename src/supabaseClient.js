    import { createClient } from '@supabase/supabase-js'
    const supabaseUrl = 'https://fgkmutdodiaoulsvvoqd.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZna211dGRvZGlhb3Vsc3Z2b3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNTY0OTcsImV4cCI6MjA2NDgzMjQ5N30.iP1vuWDVY7DsKB7t_X5TjS3fU8fKXsQDldBgk8fipMg'
    export const supabase = createClient(supabaseUrl, supabaseAnonKey)