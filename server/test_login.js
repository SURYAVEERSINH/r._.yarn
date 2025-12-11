// Native fetch in Node 18+


async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'rpatel2006@gmail.com', password: 'RPATEL' })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login Successful:', data.email, 'Admin:', data.isAdmin);
        } else {
            console.log('Login Failed:', response.status, response.statusText);
            const err = await response.json();
            console.log('Error:', err);
        }
    } catch (error) {
        console.error('Request Failed:', error);
    }
}

testLogin();
