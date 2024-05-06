import './App.css';
import { AuthPage } from './pages/AuthPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage/DashboardPage.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';

function App() {
    return (
        <div className="App background">
            <Routes>
                <Route path={'/'} element={<DashboardPage />}></Route>
                <Route path={'/register'} element={<RegisterPage />}></Route>
                <Route path={'/auth'} element={<AuthPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
