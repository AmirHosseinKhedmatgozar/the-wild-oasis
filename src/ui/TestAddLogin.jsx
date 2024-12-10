import styled from "styled-components";
import Heading from "./Heading";
import toast from "react-hot-toast";

const StyledtestLogin = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f7f7f7;
  position: absolute;
  left: 5%;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h3`
  color: white;
`;
const Btn = styled.button`
  margin-left: 1rem;
  text-decoration: underline;
  font-size: 2rem;
  margin-bottom: 0.1rem;
  border: none;
  background: none;
  border-radius: 10%;
`;
const Info = styled.span`
  color: #7996e5;
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function TestAddLogin() {
  function handleCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Message copied");
    });
  }
  return (
    <StyledtestLogin>
      <Header>A test email and password to log in</Header>
      <Parent>
        <Heading as="h2">
          email
          <Info>
            <Btn onClick={() => handleCopy("hossein@gmail.com")}>
              hossein@gmail.com
            </Btn>
          </Info>
        </Heading>
        <Heading as="h2">
          password
          <Info>
            <Btn onClick={() => handleCopy("1234567890")}>1234567890</Btn>
          </Info>
        </Heading>
      </Parent>
    </StyledtestLogin>
  );
}

export default TestAddLogin;
