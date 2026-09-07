import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService, INITIAL_SETTINGS, INITIAL_PROJECTS, INITIAL_BLOG, INITIAL_CERTIFICATES, INITIAL_ACHIEVEMENTS, INITIAL_WRITINGS, INITIAL_EXPERIENCES, INITIAL_SKILLS } from '../services/storageService';

const DataContext = createContext();
const DATA_VERSION = 'v6_no_reset';

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [blogPosts, setBlogPosts] = useState(INITIAL_BLOG);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [writings, setWritings] = useState(INITIAL_WRITINGS);
  const [experiences, setExperiences] = useState(INITIAL_EXPERIENCES);
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  // Sync seed data if version updated
  useEffect(() => {
    const initApp = async () => {
      const currentVersion = localStorage.getItem('gina_portfolio_version');
      if (currentVersion !== DATA_VERSION) {
        // ONLY update the version key - DO NOT reset/wipe user data
        localStorage.setItem('gina_portfolio_version', DATA_VERSION);
      }
      await refreshData();
    };
    initApp();

    // Listen for storage changes from OTHER tabs (e.g., admin saves in one tab,
    // portfolio page in another tab automatically updates)
    const handleStorageChange = (event) => {
      const portfolioKeys = [
        'gina_portfolio_projects',
        'gina_portfolio_blog',
        'gina_portfolio_certificates',
        'gina_portfolio_achievements',
        'gina_portfolio_writings',
        'gina_portfolio_experiences',
        'gina_portfolio_skills',
        'gina_portfolio_settings',
      ];
      if (event.key && portfolioKeys.includes(event.key)) {
        refreshData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Reload data from API
  const refreshData = async () => {
    setLoading(true);
    try {
      const [
        sSettings, sProjects, sBlogPosts, sCertificates, sAchievements, sWritings, sExperiences, sSkills
      ] = await Promise.all([
        StorageService.getSettings(),
        StorageService.getProjects(),
        StorageService.getBlogPosts(),
        StorageService.getCertificates(),
        StorageService.getAchievements(),
        StorageService.getWritings(),
        StorageService.getExperiences(),
        StorageService.getSkills()
      ]);

      if (sSettings) setSettings(sSettings);
      if (sProjects) setProjects(sProjects);
      if (sBlogPosts) setBlogPosts(sBlogPosts);
      if (sCertificates) setCertificates(sCertificates);
      if (sAchievements) setAchievements(sAchievements);
      if (sWritings) setWritings(sWritings);
      if (sExperiences) setExperiences(sExperiences);
      if (sSkills) setSkills(sSkills);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Settings Actions
  const updateSettings = async (newSettings) => {
    const updated = await StorageService.saveSettings(newSettings);
    setSettings(updated);
  };

  // Projects Actions
  const addProject = async (project) => {
    const newProject = {
      ...project,
      id: project.id || `project-${Date.now()}`,
      status: project.status || 'published'
    };
    const updated = [newProject, ...projects];
    await StorageService.saveProjects(updated);
    setProjects(updated);
  };

  const updateProject = async (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    await StorageService.saveProjects(updated);
    setProjects(updated);
  };

  const deleteProject = async (id) => {
    const updated = projects.filter(p => p.id !== id);
    await StorageService.saveProjects(updated);
    setProjects(updated);
  };

  // Blog Actions
  const addBlogPost = async (post) => {
    const newPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
      status: post.status || 'published'
    };
    const updated = [newPost, ...blogPosts];
    await StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  const updateBlogPost = async (id, updatedPost) => {
    const updated = blogPosts.map(p => p.id === id ? { ...p, ...updatedPost } : p);
    await StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  const deleteBlogPost = async (id) => {
    const updated = blogPosts.filter(p => p.id !== id);
    await StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  // Certificate Actions
  const addCertificate = async (cert) => {
    const newCert = { ...cert, id: cert.id || `cert-${Date.now()}` };
    const updated = [newCert, ...certificates];
    await StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  const updateCertificate = async (id, updatedCert) => {
    const updated = certificates.map(c => c.id === id ? { ...c, ...updatedCert } : c);
    await StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  const deleteCertificate = async (id) => {
    const updated = certificates.filter(c => c.id !== id);
    await StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  // Achievements Actions
  const addAchievement = async (ach) => {
    const newAch = { ...ach, id: ach.id || `ach-${Date.now()}` };
    const updated = [newAch, ...achievements];
    await StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  const updateAchievement = async (id, updatedAch) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...updatedAch } : a);
    await StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  const deleteAchievement = async (id) => {
    const updated = achievements.filter(a => a.id !== id);
    await StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  // Writings Actions
  const addWriting = async (w) => {
    const newW = { ...w, id: w.id || `writing-${Date.now()}` };
    const updated = [newW, ...writings];
    await StorageService.saveWritings(updated);
    setWritings(updated);
  };

  const updateWriting = async (id, updatedW) => {
    const updated = writings.map(w => w.id === id ? { ...w, ...updatedW } : w);
    await StorageService.saveWritings(updated);
    setWritings(updated);
  };

  const deleteWriting = async (id) => {
    const updated = writings.filter(w => w.id !== id);
    await StorageService.saveWritings(updated);
    setWritings(updated);
  };

  // Experience Actions
  const addExperience = async (exp) => {
    const newExp = { ...exp, id: exp.id || `exp-${Date.now()}` };
    const updated = [newExp, ...experiences];
    await StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  const updateExperience = async (id, updatedExp) => {
    const updated = experiences.map(e => e.id === id ? { ...e, ...updatedExp } : e);
    await StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  const deleteExperience = async (id) => {
    const updated = experiences.filter(e => e.id !== id);
    await StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  // Skills Actions
  const updateSkills = async (newSkills) => {
    await StorageService.saveSkills(newSkills);
    setSkills(newSkills);
  };

  // Reset Data
  const resetData = async () => {
    await StorageService.resetAllData();
    await refreshData();
  };

  return (
    <DataContext.Provider value={{
      loading,
      settings,
      updateSettings,
      projects,
      addProject,
      updateProject,
      deleteProject,
      blogPosts,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      certificates,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      achievements,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      writings,
      addWriting,
      updateWriting,
      deleteWriting,
      experiences,
      addExperience,
      updateExperience,
      deleteExperience,
      skills,
      updateSkills,
      resetData,
      refreshData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
