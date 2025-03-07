import { useReadingProgress } from "../hooks/useReadingProgress";
import styled from "styled-components";

const Nav = styled.nav`
  position: sticky;
  top: 32px;
  z-index: 50;
  backdrop-filter: blur(3xl);
  padding: 0.5rem 0;
`;

const ProgressBar = styled.span`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.25rem;
  background-color: var(--color-main); /* Equivalent to bg-yellow-400 */
  transition: transform 150ms;
  transform: ${({ completion }) => `translateX(${completion - 100}%)`};
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
