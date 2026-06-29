import "./guiaTalles.css";

const lineas = [
  { key: "hombro", x1: 31, y1: 28, x2: 68, y1b: 28, etX: 50, etY: 25, horizontal: true,  delay: 0   },
  { key: "pecho",  x1: 30, y1: 55, x2: 68, y1b: 55, etX: 50, etY: 52, horizontal: true,  delay: 170 },
  { key: "largo",  x1: 88, y1: 5,  x2: 88, y1b: 95, etX: 88, etY: 50, horizontal: false, delay: 330 },
 { 
  key: "manga", 
  x1: 27, 
  y1: 8, 
  x2: 15, 
  y1b:40 , 
  etX: 12, 
  etY: 40, 
  horizontal: false, 
  delay: 490 
},
];

export const GuiaTalles = ({ talle, medidas, visible }) => {
  const m = talle ? medidas[talle] : null;

  if (!visible || !m) return null;

  return (
    <svg
      className="guiatalles__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lineas.map(({ key, x1, y1, x2, y1b, etX, etY, delay }) => (
        <g key={key} className="guiatalles__grupo" style={{ animationDelay: `${delay}ms` }}>
          <line
            x1={x1} y1={y1}
            x2={x2} y2={y1b}
            stroke="#4a90e2"
            strokeWidth="0.5"
            strokeDasharray="2 1"
          />
          <rect
            x={etX - 7} y={etY - 3}
            width="14" height="5"
            rx="1" fill="#4a90e2"
          />
          <text
            x={etX} y={etY + 1}
            textAnchor="middle"
            fontSize="3"
            fill="white"
            fontFamily="sans-serif"
          >
            {m[key]}
          </text>
        </g>
      ))}
    </svg>
  );
};