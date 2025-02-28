import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme";
import { Route, Routes } from "react-router-dom"; // ❌ Removed extra BrowserRouter
import UserLogin from "./login/UserLogin.jsx";
import SignupForm from "./login/Usersignup.jsx";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={<SignupForm />} />
          </Routes>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
