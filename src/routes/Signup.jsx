import { useState } from "react"
import { Button } from "../components";
import { useNavigate } from "react-router";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("avatar", avatar);
        console.log(formData);
        try {
            const response = await fetch("/api/v1/users/register", { method: "POST", body: formData, });
            console.log(response);
            navigate("/");
        } catch (error) {
            console.error("Error: ", error.message);
        }
    };

    return (
        <div>
            <form className="p-8 size-100 bg-gray-400 *:bg-white [&_button]:bg-prussian-blue *:border-2
                space-y-2" onSubmit={handleSubmit}>
                <input type="text" name="" value={fullName} placeholder="fullname"
                    onChange={(e) => setFullName(e.target.value)} />
                <input type="email" name="" value={email} placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="" value={username} placeholder="username"
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="" value={password} placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <input type="file" name="" placeholder="avatar" accept=".png,.jpg,.jpeg,.webp,.heic"
                    onChange={(e) => setAvatar(e.target.files[0])} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

