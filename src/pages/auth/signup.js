import Form from "@/components/auth/form";

export default function SignUp() {
    const onSubmit = async (email, password) => {
        console.log(email, password);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                alert('signup successfull!!')
            }
        } catch (error) {
            console.log(error);
        }

    }
    return <Form signin={false} onFormSubmit={onSubmit} />
};
