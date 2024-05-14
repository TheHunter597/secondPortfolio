import SkillElement from "./SkillElement";

interface SkillsCardProps {
  category: string;
  skills: {
    name: string;
    icon?: React.ComponentType | string;
    basics?: boolean;
    image?: string;
  }[];
}
export default function SkillsCard({ category, skills }: SkillsCardProps) {
  const skillsList = skills.map((skill, index) => (
    <SkillElement
      key={`skillElement-${index}`}
      name={skill.name}
      IconElement={skill.icon}
      basics={skill.basics}
      image={skill.image}
    />
  ));
  return (
    <div
      className="px-4 py-8 rounded-md w-80 font-semibold 
    flex flex-col gap-4
    "
    >
      <h4 className="text-xl font-bold text-white ">{category}</h4>
      <div className="flex flex-wrap gap-3">{skillsList}</div>
    </div>
  );
}
