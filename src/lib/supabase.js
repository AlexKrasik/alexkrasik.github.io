import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btakqowzfmqevkjhyvrt.supabase.co'
const supabaseKey = 'sb_publishable_B6AruTF5asQ2lKN3IxVXlQ_vxhGFAmE' // publishable key

export const supabase = createClient(supabaseUrl, supabaseKey)
