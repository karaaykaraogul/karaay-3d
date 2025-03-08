import React from "react";
import FormattedContent from "./FormattedContent";
import "@/styles/featureCard.css";

interface FeatureCardProps {
  title: string;
  innerContent: React.ReactNode;
  id: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  innerContent,
  id,
  isExpanded,
  onToggle,
}) => {
  const handleClose = () => {
    onToggle("");
  };

  if (isExpanded) {
    return (
      <div className="cmd-expanded">
        <div className="cmd-title-bar">
          <span className="cmd-title">{title}</span>
          <div className="cmd-controls">
            <button className="cmd-control cmd-minimize">─</button>
            <button className="cmd-control cmd-maximize">□</button>
            <button className="cmd-control cmd-close" onClick={handleClose}>
              ✕
            </button>
          </div>
        </div>
        <div className="cmd-content">
          <div className="cmd-prompt" style={{ color: "#0f0" }}>
            C:\Users\guest&gt;
          </div>
          <div className="cmd-output">
            <FormattedContent content={innerContent as string} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cmd-card" onClick={() => onToggle(id)}>
      <div className="cmd-title-bar">
        <span className="cmd-title">{title}</span>
        <div className="cmd-controls">
          <span className="cmd-control cmd-minimize">─</span>
          <span className="cmd-control cmd-maximize">□</span>
          <span className="cmd-control cmd-close">✕</span>
        </div>
      </div>
      <div className="cmd-preview">Click to expand...</div>
    </div>
  );
};

export default FeatureCard;
