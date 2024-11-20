import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertDanger, AlertSuccess } from '../../components/alert';
import { UserContext } from '../../context/user-context';
import { login } from '../../repositories/AuthRepository';
import { getProfile } from '../../repositories/UserRepository';
import './login.css';

export function LoginPage() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [loginCredential, setLoginCredential] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            // Người dùng đã đăng nhập, chuyển hướng về trang chính
            navigate("/");
        }
    }, [user]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        login(loginCredential.username, loginCredential.password)
            .then((response) => {
                setSuccess("Đăng nhập thành công");
                getProfile().then((response) => {
                    setUser(response.data);
                });
            })
            .catch((error) => {
                setError(error.response.data.message);
            })
            .finally(() => {
                setLoginCredential({
                    ...loginCredential,
                    password: "",
                });
            });
    }

    const onAlertClose = () => {
        setError(null);
        setSuccess(null);
    }

    return (
        <div className='login-page'>
            <form style={{
                maxWidth: '24rem',
                width: '100%',
            }}>
                {error && <AlertDanger onClose={onAlertClose}>{error}</AlertDanger>}
                {success && <AlertSuccess onClose={onAlertClose}>{success}</AlertSuccess>}
                <h2>Đăng nhập</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label w-100">Số điện thoại/Email</label>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        value={loginCredential.username}
                        className='form-control'
                        onInput={(e) =>
                            setLoginCredential({ ...loginCredential, username: e.currentTarget.value })
                        }
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className='form-label w-100'>
                        Mật khẩu:
                    </label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        className='form-control'
                        value={loginCredential.password}
                        onInput={(e) =>
                            setLoginCredential({ ...loginCredential, password: e.currentTarget.value })
                        }
                    />
                </div>
                <button
                    type='submit'
                    className='btn btn-primary w-100'
                    onClick={handleLogin}
                >Đăng nhập</button>
            </form>
        </div>
    );
}