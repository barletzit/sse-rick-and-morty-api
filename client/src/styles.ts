import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SyncContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Arial", sans-serif;
`;

export const StartButton = styled.button`
  background-color: #44281d;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #97ce4c;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ProgressSection = styled.div`
  margin: 2rem 0;
  animation: ${fadeIn} 0.5s ease-in;
`;

export const ProgressBar = styled.progress`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: #f0f0f0;
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: #97ce4c;
    transition: width 0.3s ease;
  }

  &::-moz-progress-bar {
    background-color: #97ce4c;
    border-radius: 10px;
  }
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const StatItem = styled.p`
  margin: 0;
  color: #44281d;
  font-weight: bold;
`;

export const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CharacterCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%; // Make sure cards take full width of their grid cell
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

export const CharacterInfo = styled.div`
  padding: 15px;
  flex: 1;
`;

export const CharacterName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #44281d;
  font-size: 1.2rem;
`;

export const CharacterDetail = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StatusIndicator = styled.span<{ status: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ status }) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "#97ce4c";
      case "dead":
        return "#d63d2e";
      default:
        return "#808080";
    }
  }};
`;

export const MessageContainer = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease-in;
`;

export const SuccessMessage = styled(MessageContainer)`
  background-color: #e7f5e7;
  color: #2e7d32;
`;

export const ErrorMessage = styled(MessageContainer)`
  background-color: #ffebee;
  color: #c62828;
`;
