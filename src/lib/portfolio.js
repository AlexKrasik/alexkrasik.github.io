import {supabase} from "@/lib/supabase";

const portfolio = new Map();

export async function loadProjects() {
    if (!portfolio.has('projects')) {
        const {data, error} = await supabase.from('category').select('*, project(*)').order('id');
        if (error) throw error;

        data.forEach(cat => {
            cat?.project.sort((a, b) => a.title.localeCompare(b.title));
        })

        portfolio.set('projects', data)
    }

    return portfolio.get('projects');
}