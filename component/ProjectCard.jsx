export default function ProjectCard({ project }) {
  return (
    <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-emerald-300">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-2xl mb-8 h-64">
        <img 
          src={project.image || 'https://via.placeholder.com/500x300?text=No+Image'} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Title */}
      <h3 className="text-2xl md:text-3xl font-black mb-6 group-hover:text-emerald-600 transition-all duration-300">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed line-clamp-4">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-3 mb-10">
        {project.techStack?.map((tech, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all group-hover:scale-105"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
        <div className="flex items-center gap-6">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-bold text-lg flex items-center gap-2 group-hover:translate-x-2 transition-all duration-300 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
        
        {project.liveLink && (
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}