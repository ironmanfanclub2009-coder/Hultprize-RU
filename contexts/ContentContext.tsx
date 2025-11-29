import React, { createContext, useContext, useState, useEffect } from 'react';

export const defaultContent = {
  hero: {
    badge: "🚀 THE NOBEL PRIZE FOR STUDENTS",
    title: "Leading a Generation to Change the World",
    subtitle: "Join the Hult Prize at Rajshahi University 2025 on-campus program and turn your idea into a startup.",
    ctaRegister: "Register Your Team",
    ctaLearn: "Learn More"
  },
  timeline: [
    { date: "Oct 20, 2024", title: "Registration Opens", desc: "Form your teams of 3-4 students and register." },
    { date: "Nov 15, 2024", title: "Registration Closes", desc: "Last day to submit your team details." },
    { date: "Dec 01, 2024", title: "On-Campus Finals", desc: "Pitch your idea to judges at Rajshahi University." }
  ],
  about: {
    mission: "The Hult Prize challenges young people to solve the world's most pressing issues through social entrepreneurship. Every year, one winning team receives $1M USD in seed capital to launch their startup.",
    vision: "To create a world where young people are the leaders of change, building sustainable businesses that impact millions of lives.",
    campusProgram: "At Rajshahi University, we bring this global movement to our campus, providing training, mentorship, and a platform for students to showcase their innovative ideas."
  },
  team: [
    { name: "Rahim Ahmed", role: "Campus Director", image: "" },
    { name: "Sarah Khan", role: "Head of Organizing", image: "" },
    { name: "Tanvir Islam", role: "Head of Communications", image: "" },
    { name: "Nusrat Jahan", role: "Head of Logistics", image: "" }
  ]
};

const ContentContext = createContext<any>(null);

export const ContentProvider = ({ children }: any) => {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem('hult_site_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with default to ensure new fields (like team image) exist if local storage is old
        const mergedContent = {
            ...defaultContent,
            ...parsed,
            team: parsed.team?.map((member: any) => ({
                image: "", // Ensure image field exists
                ...member
            })) || defaultContent.team
        };
        setContent(mergedContent);
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('hult_site_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('hult_site_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);