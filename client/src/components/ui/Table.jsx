export function Table({ children, className }) {
    return <table className={`w-full border-collapse ${className}`}>{children}</table>;
}

export function TableHeader({ children }) {
    return <thead className="bg-gray-100 border-b">{children}</thead>;
}

export function TableHead({ children, className }) {
    return <th className={`px-4 py-2 text-left font-medium ${className}`}>{children}</th>;
}

export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }) {
    return <tr className={`border-b ${className}`}>{children}</tr>;
}

export function TableCell({ children, className }) {
    return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}
