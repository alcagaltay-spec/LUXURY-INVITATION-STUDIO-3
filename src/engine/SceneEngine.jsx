import "./SceneEngine.css";
import InvitationSection from "../components/InvitationSection/InvitationSection";

export default function SceneEngine({ scenes }) {
  return (
    <div className="scene-engine">
      {scenes.map((scene, index) => (
        <div
          className="scene-frame"
          key={scene.id}
          style={{ "--scene-index": index }}
        >
          <InvitationSection section={scene} />
        </div>
      ))}
    </div>
  );
}