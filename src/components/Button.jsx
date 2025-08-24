export default function Button({ type = "button", children, onClick }) {
    return (
        <button type={type} className={`rounded-md text-sm h-10 px-4 py-2 font-bold cursor-pointer inset-ring-2
        inline-block active:scale-95 transition-colors duration-200 bg-prussian-blue text-white
        inset-ring-barn-red/30 hover:inset-ring-prussian-blue/30 hover:bg-air-superiority-blue`}
            onClick={onClick} >
            {children}
        </button >
    )
}
