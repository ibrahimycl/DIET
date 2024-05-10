import AppRoutes from "../routes/AppRoutes";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
        <Routes>
            {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
            })}
        </Routes>
  );
}

export default App;