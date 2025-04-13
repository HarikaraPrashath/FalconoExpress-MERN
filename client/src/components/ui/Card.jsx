export function Card({ children, className }) {
    return <div className={`shadow-md p-4 bg-white ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }) {
    return <div className={`border-b p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children }) {
    return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
}

export function CardDescription({ children }) {
    return <p className="text-sm text-gray-500">{children}</p>;
}
