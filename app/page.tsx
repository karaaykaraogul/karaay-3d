"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import Footer from "@/components/Footer";
import TypewriterEffect from "@/components/TypewriterEffect";
import FeatureCard from "@/components/FeatureCard";
import { featureCardContent } from "@/data/featureCardContent";
import "@/styles/global.css";
import "@/styles/featureCard.css";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<string>("");

  const handleToggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? "" : id);
  };

  return (
    <main className="main-container">
      <div className="canvas-container">
        <Scene />
      </div>
      <div className="content-wrapper">
        <div className="content-area">
          <div className="hero-container">
            <TypewriterEffect
              words={["Karaay Karaoğul", "Software Engineer"]}
              className="hero-title"
              defaultWordPause={5000}
              firstWordPause={10000}
            />
            <p className="hero-description">Hello!</p>

            {expandedCard && (
              <FeatureCard
                title={
                  featureCardContent[
                    expandedCard as keyof typeof featureCardContent
                  ].title
                }
                id={expandedCard}
                isExpanded={true}
                onToggle={handleToggleCard}
                innerContent={
                  featureCardContent[
                    expandedCard as keyof typeof featureCardContent
                  ].content
                }
              ></FeatureCard>
            )}

            {!expandedCard && (
              <div className="features-container">
                <div className="features-grid">
                  <FeatureCard
                    title={featureCardContent.about.title}
                    id="about"
                    isExpanded={false}
                    onToggle={handleToggleCard}
                    innerContent={featureCardContent.about.content}
                  />
                  <FeatureCard
                    title={featureCardContent.skills.title}
                    id="skills"
                    isExpanded={false}
                    onToggle={handleToggleCard}
                    innerContent={featureCardContent.skills.content}
                  />
                  <FeatureCard
                    title={featureCardContent.workExperience.title}
                    id="workExperience"
                    isExpanded={false}
                    onToggle={handleToggleCard}
                    innerContent={featureCardContent.workExperience.content}
                  />
                  <FeatureCard
                    title={featureCardContent.education.title}
                    id="education"
                    isExpanded={false}
                    onToggle={handleToggleCard}
                    innerContent={featureCardContent.education.content}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
