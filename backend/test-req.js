async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: 'test', lastName: 'test', email: 'test1@test.com', password: 'password123' })
        });
        const text = await res.text();
        console.log(res.status, text.slice(0, 500));
    } catch (err) {
        console.error(err);
    }
}
test();
