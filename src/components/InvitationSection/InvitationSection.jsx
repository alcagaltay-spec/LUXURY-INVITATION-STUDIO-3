import "./InvitationSection.css";

import SectionTitle from "../SectionTitle/SectionTitle";
import GlassCard from "../GlassCard/GlassCard";
import LuxuryButton from "../LuxuryButton/LuxuryButton";
import Divider from "../Divider/Divider";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

export default function InvitationSection({ section }) {
  const content = (
    <div className="scene-content-inner">
      <SectionTitle
        eyebrow={section.eyebrow}
        title={section.title}
        text={section.text}
      />

      <Divider />

      {section.buttonText && (
        <LuxuryButton onClick={section.onButtonClick}>
  {section.buttonText}
</LuxuryButton>
      )}
    </div>
  );

  return (
    <section
      className={`
        invitation-section
        scene-${section.id}
        layout-${section.layout}
        overlay-${section.overlay}
        position-${section.position}
      `}
      style={{ backgroundImage: `url(${section.background})` }}
    >
      <div className="scene-bg-motion" />
      <div className="scene-overlay" />
      <div className="scene-light" />

      <div className="invitation-section-content">
        {section.card ? <GlassCard>{content}</GlassCard> : content}
      </div>

      {section.id !== "thanks" && <ScrollIndicator />}
    </section>
  );
}