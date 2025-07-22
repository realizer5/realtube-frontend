export default function Button({ type = "button", children }) {
    return (
        <button type={type} className="bg-fire-brick text-white rounded-lg px-4 py-2 font-bold cursor-pointer
            inset-ring-2 inset-ring-barn-red/30 inline-block hover:bg-barn-red transition-colors duration-200">
            {children}
        </button>
    )
}

