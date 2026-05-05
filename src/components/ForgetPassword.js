import React, { useState } from 'react';

function ForgetPassword() {
    const [email, setEmail] = useState("");



    return (
        <div>
            <h1>Forget Password</h1>
            <form onSubmit={onSubmitForgetPassword}>
                <input type="email" placeholder='Enter your email' value={email} onChange={(event) => setEmail(event.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}

export default ForgetPassword; 