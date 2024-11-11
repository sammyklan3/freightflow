// Primary - blue
// Success - green
// Danger - red
// Warning - yellow

interface BadgeProps {
    label: string;
    type: 'primary' | 'success' | 'danger' | 'warning';
};

const Badge = ({ label, type }: BadgeProps) => {
  return (
    <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${type === "primary" ? "bg-blue-100 text-blue-800" : type === "success" ? "bg-green-100 text-green-800" : type === "danger" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
    >{label}</span>
  )
}

export default Badge;
