import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const DataContext = createContext();
const DATA_VERSION = 'v3_gina_sabilla_2026_templates';

export const DataProvider = ({ children }) => {
  // Sync seed data if version updated
  useEffect(() => {
    const currentVersion = localStorage.getItem('gina_portfolio_version');
    if (currentVersion !== DATA_VERSION) {
      StorageService.resetAllData();
      localStorage.setItem('gina_portfolio_version', DATA_VERSION);
      refreshData();
    }
  }, []);

  const [settings, setSettings] = useState(StorageService.getSettings());
  const [projects, setProjects] = useState(StorageService.getProjects());
  const [blogPosts, setBlogPosts] = useState(StorageService.getBlogPosts());
  const [certificates, setCertificates] = useState(StorageService.getCertificates());
  const [achievements, setAchievements] = useState(StorageService.getAchievements());
  const [writings, setWritings] = useState(StorageService.getWritings());
  const [experiences, setExperiences] = useState(StorageService.getExperiences());
  const [skills, setSkills] = useState(StorageService.getSkills());

  // Reload data from storage
  const refreshData = () => {
    setSettings(StorageService.getSettings());
    setProjects(StorageService.getProjects());
    setBlogPosts(StorageService.getBlogPosts());
    setCertificates(StorageService.getCertificates());
    setAchievements(StorageService.getAchievements());
    setWritings(StorageService.getWritings());
    setExperiences(StorageService.getExperiences());
    setSkills(StorageService.getSkills());
  };


  // Settings Actions
  const updateSettings = (newSettings) => {
    const updated = StorageService.saveSettings(newSettings);
    setSettings(updated);
  };

  // Projects Actions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || `project-${Date.now()}`,
      status: project.status || 'published'
    };
    const updated = [newProject, ...projects];
    StorageService.saveProjects(updated);
    setProjects(updated);
  };

  const updateProject = (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    StorageService.saveProjects(updated);
    setProjects(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    StorageService.saveProjects(updated);
    setProjects(updated);
  };

  // Blog Actions
  const addBlogPost = (post) => {
    const newPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
      status: post.status || 'published'
    };
    const updated = [newPost, ...blogPosts];
    StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  const updateBlogPost = (id, updatedPost) => {
    const updated = blogPosts.map(p => p.id === id ? { ...p, ...updatedPost } : p);
    StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  const deleteBlogPost = (id) => {
    const updated = blogPosts.filter(p => p.id !== id);
    StorageService.saveBlogPosts(updated);
    setBlogPosts(updated);
  };

  // Certificate Actions
  const addCertificate = (cert) => {
    const newCert = { ...cert, id: cert.id || `cert-${Date.now()}` };
    const updated = [newCert, ...certificates];
    StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  const updateCertificate = (id, updatedCert) => {
    const updated = certificates.map(c => c.id === id ? { ...c, ...updatedCert } : c);
    StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  const deleteCertificate = (id) => {
    const updated = certificates.filter(c => c.id !== id);
    StorageService.saveCertificates(updated);
    setCertificates(updated);
  };

  // Achievements Actions
  const addAchievement = (ach) => {
    const newAch = { ...ach, id: ach.id || `ach-${Date.now()}` };
    const updated = [newAch, ...achievements];
    StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  const updateAchievement = (id, updatedAch) => {
    const updated = achievements.map(a => a.id === id ? { ...a, ...updatedAch } : a);
    StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  const deleteAchievement = (id) => {
    const updated = achievements.filter(a => a.id !== id);
    StorageService.saveAchievements(updated);
    setAchievements(updated);
  };

  // Writings Actions
  const addWriting = (w) => {
    const newW = { ...w, id: w.id || `writing-${Date.now()}` };
    const updated = [newW, ...writings];
    StorageService.saveWritings(updated);
    setWritings(updated);
  };

  const updateWriting = (id, updatedW) => {
    const updated = writings.map(w => w.id === id ? { ...w, ...updatedW } : w);
    StorageService.saveWritings(updated);
    setWritings(updated);
  };

  const deleteWriting = (id) => {
    const updated = writings.filter(w => w.id !== id);
    StorageService.saveWritings(updated);
    setWritings(updated);
  };

  // Experience Actions
  const addExperience = (exp) => {
    const newExp = { ...exp, id: exp.id || `exp-${Date.now()}` };
    const updated = [newExp, ...experiences];
    StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  const updateExperience = (id, updatedExp) => {
    const updated = experiences.map(e => e.id === id ? { ...e, ...updatedExp } : e);
    StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  const deleteExperience = (id) => {
    const updated = experiences.filter(e => e.id !== id);
    StorageService.saveExperiences(updated);
    setExperiences(updated);
  };

  // Skills Actions
  const updateSkills = (newSkills) => {
    StorageService.saveSkills(newSkills);
    setSkills(newSkills);
  };

  // Reset Data
  const resetData = () => {
    StorageService.resetAllData();
    refreshData();
  };

  return (
    <DataContext.Provider value={{
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
