'use client';
import { useRouter } from 'next/navigation';

type ProductItem = {
  nombre: string;
  existencia: number;
};

type WarehouseCardProps = {
  id: number | undefined;
  title: string;
  items: ProductItem[];
  color: string;
};

export const WarehouseCard = ({ id, title, items, color }: WarehouseCardProps) => {
  const router = useRouter();

  const visibleItems = items.slice(0, 5);
  const extraCount = items.length - visibleItems.length;

  const handleClick = () => {
    if (typeof id === 'number' && !isNaN(id)) {
      router.push(`/almacenes/${id}`);
    } else {
      console.error("ID de almacén inválido:", id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-2xl p-4 w-64 text-black text-left transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none"
      style={{
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h2 className="font-bold font-lato text-xl mb-2">{title}</h2>
      <ul className="font-mono text-sm space-y-1">
        {visibleItems.map((item, i) => (
          <li key={i}>
            - {item.nombre} ({item.existencia})
          </li>
        ))}
        {extraCount > 0 && (
          <li className="italic text-gray-700">→ y {extraCount} más productos...</li>
        )}
      </ul>
    </button>
  );
};
