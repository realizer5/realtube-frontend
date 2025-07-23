export default function Button({ type = "button", children }) {
    return (
        <button type={type} className="bg-fire-brick text-white rounded-lg px-4 py-2 font-bold cursor-pointer
            inset-ring-2 inset-ring-barn-red/30 inline-block hover:inset-ring-fire-brick/30 hover:bg-barn-red active:scale-95 transition-colors duration-200">
            {children}
        </button>
    )
}

