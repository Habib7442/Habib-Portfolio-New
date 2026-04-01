import { createClient } from './supabase/server'

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data;
}

export async function getDesigns() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching designs:', error);
    return [];
  }
  return data;
}

export async function getBlogs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data;
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
  return data;
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data;
}
