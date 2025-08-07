import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState(null);

    return (
        <div className="grid place-items-center min-h-screen">
            <form className="size-50 bg-black">
                <input type="" name="" value={email} />
            </form>
        </div>
    )
}

