export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string | null;
  client: string;
  role: string;
  challenges: string[];
  achievements: string[];
}

export interface ProjectData {
  projects: Project[];
  categories: string[];
  technologies: string[];
}

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export interface ProjectFilterProps {
  categories: string[];
  technologies: string[];
  selectedCategory?: string;
  selectedTechnology?: string;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (technology: string) => void;
}
