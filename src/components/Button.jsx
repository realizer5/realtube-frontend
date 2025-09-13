export default function Button({ variant, type = "button", children, onClick }) {
    if (variant === "outline") {
        return (
            <button type={type} className={`rounded-md text-sm px-4 py-2 font-bold cursor-pointer
        inline-block active:scale-95 transition-colors duration-200 bg-papaya-whip text-black outline-1
        outline-black hover:bg-papaya-whip/20`}
                onClick={onClick} >
                {children}
            </button >
        )
    }
    return (
        <button type={type} className={`rounded-md text-sm px-4 py-2 font-bold cursor-pointer inset-ring-2
        inline-block active:scale-95 transition-colors duration-200 bg-prussian-blue text-white
        inset-ring-barn-red/30 hover:inset-ring-prussian-blue/30 hover:bg-air-superiority-blue`}
            onClick={onClick} >
            {children}
        </button >
    )
}
