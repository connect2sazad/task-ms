import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';

const LoginPage = () => {
    return (
        <>
            <Header />
            <section>

                <div class="login-section">
                    <form action="http://127.0.0.1/tms/login/login-auth/" method="POST">
                        <h1>Login</h1>
                        <input type="text" placeholder="User Id" name="userid" />
                        <input type="password" placeholder="Password" name="password" />
                        <input type="submit" />
                    </form>
                </div>

            </section>
            <Footer />
        </>
    );
}

export default LoginPage;