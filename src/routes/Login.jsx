import { useState } from "react";
import { Button } from "../components";

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = JSON.stringify({ email, username, password });
        console.log(formData)
        try {
            const response = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: formData,
            });
            console.log(response);
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    return (
        <div className="grid place-items-center mt-20">
            <form className="grid place-items-center p-8 w-100 bg-gray-400 [&_input]:bg-white [&_button]:bg-prussian-blue
                [&_input]:border-2 space-y-2 rounded-lg [&_input]:rounded-md [&_input]:py-1 [&_input]:px-2" onSubmit={handleSubmit}>
                <input type="text" name="" value={username} className="bg-white" placeholder="username"
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="email" name="" value={email} className="bg-white" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="" value={password} className="bg-white" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <Button type="submit">Log In</Button>
                </div>
            </form>
        </div>
    )
}
