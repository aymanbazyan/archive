import { useReadingProgress } from "../hooks/useReadingProgress";
import styled from "styled-components";

const Nav = styled.nav`
  height: 5px;
  overflow: hidden;
  z-index: 50;
  position: sticky;
  top: 44px;
`;

const ProgressBar = styled.span`
  width: 100%;
  height: 100%;
  background-color: var(--color-main); /* Equivalent to bg-yellow-400 */
  transition: transform 150ms;
  transform: ${({ completion }) => `translateX(${completion - 100}%)`};
  position: absolute;
  bottom: 0;
`;

export default function ReadingBar() {
  const completion = useReadingProgress();
  return (
    <Nav>
      <ProgressBar completion={completion} id="progress-bar" />
      {/* Rest of the NavBar */}
    </Nav>
  );
}
